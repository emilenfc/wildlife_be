import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateContactedDto } from './dto/create-booking.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}
  async create(id: string, createBookingDto: CreateBookingDto) {
    if (!id) {
      throw new BadRequestException('Country ID must be provided');
    }
    const newBooking = await this.prisma.booking.create({
      data: {
        ...createBookingDto,
        countryId: id
      }
    });
    if (!newBooking) {
      throw new BadRequestException('booking not created');
    }
    return newBooking;
  }

  async findAll() {
    return await this.prisma.booking.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.booking.findUnique({
      where: { id }
    });
  }
  async update(id: string, updateBookingDto: UpdateContactedDto) {
    return await this.prisma.booking.update({
      where: { id },
      data: { contacted: updateBookingDto.contacted }
    });
  }
  async remove(id: string) {
    return await this.prisma.booking.delete({
      where: { id }
    });
  }
}
