import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiProperty({ description: 'The new name of the brand' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  name: string;
}
