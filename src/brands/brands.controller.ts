import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Brands')
@ApiBearerAuth()
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: CreateBrandDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The account already exists.',
  })
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: CreateBrandDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Brand not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: UpdateBrandDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @ApiOperation({ summary: 'Delete a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'The deleted record',
    type: UpdateBrandDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
