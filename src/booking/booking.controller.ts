import { Controller, Get, Post, Body, Patch,UseGuards, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateContactedDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import {
  ApiBearerAuth,
  ApiTags
} from '@nestjs/swagger';
@Controller('booking')
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':id')
  async createBooking(@Param('id') id: string, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(id, createBookingDto);
  }
 
  @Get()
     @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
    @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    console.log(id)
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
    @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateContactedDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
    @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
