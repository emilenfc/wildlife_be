import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageCountryService } from './image-country.service';
import { CreateImageCountryDto } from './dto/create-image-country.dto';
import { UpdateImageCountryDto } from './dto/update-image-country.dto';
import { ApiParam, ApiBody } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
@Controller('image-country')
@ApiTags('image-country')
export class ImageCountryController {
  constructor(private readonly imageCountryService: ImageCountryService) {}

  @Post(':countryId')
  @ApiParam({ name: 'countryId', description: 'The ID of the country' })
  @ApiBody({ type: CreateImageCountryDto })
  create(@Param('countryId') countryId: string, @Body() createImageCountryDto: CreateImageCountryDto) {
    return this.imageCountryService.create(countryId, createImageCountryDto);
  }

  @Get()
  findAll() {
    return this.imageCountryService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the image country' })
  findOne(@Param('id') id: string) {
    return this.imageCountryService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'The ID of the image country' })
  @ApiBody({ type: UpdateImageCountryDto })
  update(@Param('id') id: string, @Body() updateImageCountryDto: UpdateImageCountryDto) {
    return this.imageCountryService.update(+id, updateImageCountryDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'The ID of the image country' })
  remove(@Param('id') id: string) {
    return this.imageCountryService.remove(+id);
  }
}