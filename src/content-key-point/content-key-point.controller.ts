import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ContentKeyPointService } from './content-key-point.service';
import { CreateContentKeyPointDto } from './dto/create-content-key-point.dto';
import { ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateContentKeyPointDto } from './dto/update-content-key-point.dto';
import {ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('content-key-points')
@ApiTags('content-key-points')
export class ContentKeyPointController {
  constructor(private readonly contentKeyPointService: ContentKeyPointService) {}

  @Post(':countryId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'countryId', description: 'The ID of the country' })
  @ApiBody({ type: CreateContentKeyPointDto })
  create(@Param('countryId') countryId: string, @Body() createContentKeyPointDto: CreateContentKeyPointDto) {
    return this.contentKeyPointService.create(countryId, createContentKeyPointDto);
  }

  @Get()
  findAll() {
    return this.contentKeyPointService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the content key point' })
  findOne(@Param('id') id: string) {
    return this.contentKeyPointService.findOne(+id);
  }

  @Put(':id')
    @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'The ID of the content key point' })
  @ApiBody({ type: CreateContentKeyPointDto })
  update(@Param('id') id: string, @Body() updateContentKeyPointDto: UpdateContentKeyPointDto) {
    return this.contentKeyPointService.update(+id, updateContentKeyPointDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'The ID of the content key point' })
  remove(@Param('id') id: string) {
    return this.contentKeyPointService.remove(+id);
  }
}
