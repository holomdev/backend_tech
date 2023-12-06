/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
});

describe('BrandsService', () => {
  let service: BrandsService;
  let brandRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    brandRepository = module.get<MockRepository>(getRepositoryToken(Brand));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
