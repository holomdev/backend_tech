import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Brand } from '../../brands/entities/brand.entity';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The brand of the product', type: () => Brand })
  @Type(() => Brand)
  brand: Brand;
}
