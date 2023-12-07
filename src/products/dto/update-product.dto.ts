import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString } from 'class-validator';
import { Brand } from '../../brands/entities/brand.entity';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'The new name of the product' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The new brand of the product',
    type: () => Brand,
  })
  @Type(() => Brand)
  @IsOptional()
  brand: Brand;
}
