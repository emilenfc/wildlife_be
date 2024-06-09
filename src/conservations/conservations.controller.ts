import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConservationsService } from './conservations.service';
import { CreateConservationDto } from './dto/create-conservation.dto';
import { UpdateConservationDto } from './dto/update-conservation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import {
  ApiBearerAuth,
  ApiTags
} from '@nestjs/swagger';
@Controller('conservations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Conservations')
export class ConservationsController {
  constructor(private readonly conservationsService: ConservationsService) {}

  @Post()
  create(@Body() createConservationDto: CreateConservationDto) {
    return this.conservationsService.create(createConservationDto);
  }

  @Get()
  findAll() {
    return this.conservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conservationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConservationDto: UpdateConservationDto) {
    return this.conservationsService.update(id, updateConservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conservationsService.remove(id);
  }
}
