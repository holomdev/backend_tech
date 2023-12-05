/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { User } from '../../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  save: jest.fn(),
  findOneBy: jest.fn(),
});

const signUpDto: SignUpDto = {
  name: 'test_name',
  email: 'test@example.com',
  username: 'username_test',
  password: 'password123',
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let hashingService: HashingService;
  let userRepository: MockRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(jwtConfig)],
      providers: [
        AuthenticationService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    hashingService = module.get<HashingService>(HashingService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should a user signup', async () => {
      const hashingPass = 'some_hashing_password';

      jest.spyOn(hashingService, 'hash').mockResolvedValueOnce(hashingPass);
      userRepository.save.mockResolvedValueOnce(signUpDto);
      const result = await service.signUp(signUpDto);

      expect(userRepository.save).toHaveBeenCalledWith({
        ...signUpDto,
        password: hashingPass,
      });
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
});
