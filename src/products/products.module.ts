import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brand } from '../brands/entities/brand.entity';
import { BrandsService } from '../brands/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Product])],
  controllers: [ProductsController],
  providers: [BrandsService, ProductsService],
})
export class ProductsModule {}
