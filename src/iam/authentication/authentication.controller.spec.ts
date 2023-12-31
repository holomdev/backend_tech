import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call method signIn in authService', async () => {
    const signInDto: SignInDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    jest.spyOn(authenticationService, 'signIn');
    await controller.signIn(signInDto);

    expect(authenticationService.signIn).toHaveBeenCalledWith(signInDto);
  });

  it('should call method signUp in authService', async () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      password: 'password123',
      username: 'username',
      name: 'name',
    };

    jest.spyOn(authenticationService, 'signUp');

    await controller.signUp(signUpDto);

    expect(authenticationService.signUp).toHaveBeenCalledWith(signUpDto);
  });
});
