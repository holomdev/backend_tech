import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'The name of the brand' })
  @IsString()
  @MaxLength(60)
  name: string;
}
