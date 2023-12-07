import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'The new name of the product' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The new id of the brand of the product' })
  @IsOptional()
  @IsNumber()
  brandId: number;
}
