/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

describe('BrandsController', () => {
  let controller: BrandsController;
  let brandService: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    brandService = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
