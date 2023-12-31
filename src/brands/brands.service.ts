/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandRepository.create(createBrandDto);
      return await this.brandRepository.save(brand);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.brandRepository.find();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const brand = await this.brandRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Brand #${id} not found`);
      }
      return brand;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const brand = await this.brandRepository.preload({
        id,
        ...updateBrandDto,
      });
      if (!brand) {
        throw new NotFoundException(`Brand #${id} not found`);
      }
      return await this.brandRepository.save(brand);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException();
      }
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const brand = await this.findOne(id);
      await this.brandRepository.remove(brand);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }
}
