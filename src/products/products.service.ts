/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly brandsService: BrandsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const brand = await this.brandsService.findOne(createProductDto.brandId);
    if (!brand) {
      throw new NotFoundException(
        `Brand with id ${createProductDto.brandId} not found`,
      );
    }
    const newProduct = this.productsRepository.create({
      ...createProductDto,
      brand,
    });
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    return await this.productsRepository.find({ relations: ['brand'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
