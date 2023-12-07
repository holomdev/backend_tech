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

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
      relations: ['brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (updateProductDto.brandId) {
      const brand = await this.brandsService.findOne(updateProductDto.brandId);
      if (!brand) {
        throw new NotFoundException(
          `Brand with id ${updateProductDto.brandId} not found`,
        );
      }
      product.brand = brand;
    }
    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }
    return await this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return await this.productsRepository.remove(product);
  }
}
