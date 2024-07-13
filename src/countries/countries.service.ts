import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const newCountry = await this.prisma.country.create({
        data: createCountryDto
      });
      return newCountry;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Country with this name already exists');
      }
      throw new BadRequestException(
        'Failed to create country: ' + error.message
      );
    }
  }

  async findAll() {
    try {
      const countries = await this.prisma.country.findMany({
        include: {
          contentKeyPoints: true,
          images: true,
          bookings: true
        }
      });
      return countries;
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve countries: ' + error.message
      );
    }
  }

  async findOne(id: string) {
    try {
      const country = await this.prisma.country.findUnique({
        where: { id },
        include: {
          contentKeyPoints: true,
          images: true,
          bookings: true
        }
      });
      if (!country) {
        throw new NotFoundException(`Country not found`);
      }
      return country;
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve country: ' + error.message
      );
    }
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    try {
      const existingCountry = await this.prisma.country.findUnique({
        where: { id }
      });
      if (!existingCountry) {
        throw new NotFoundException(`Country not found`);
      }

      const updatedCountry = await this.prisma.country.update({
        where: { id },
        data: updateCountryDto
      });
      return updatedCountry;
    } catch (error) {
      throw new BadRequestException(
        'Failed to update country: ' + error.message
      );
    }
  }

  async remove(id: string) {
    try {
      const existingCountry = await this.prisma.country.findUnique({
        where: { id }
      });
      if (!existingCountry) {
        throw new NotFoundException(`Country not found`);
      }

      await this.prisma.country.delete({
        where: { id }
      });
      return { message: `Country has been deleted` };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete country: ' + error.message
      );
    }
  }
}
