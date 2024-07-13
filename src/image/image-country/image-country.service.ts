import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageCountryDto } from './dto/create-image-country.dto';
import { UpdateImageCountryDto } from './dto/update-image-country.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImageCountryService {
  constructor(private prisma: PrismaService) {}
  async create(countryId: string, createImageCountryDto: CreateImageCountryDto) {
    try {
      if (!createImageCountryDto.image && !createImageCountryDto.video) {
        throw new BadRequestException('No image or video provided');
      }
      // check if the link exist
      if (createImageCountryDto.image) {
        const imageExists = await this.prisma.imageCountry.findFirst({
          where: { image: createImageCountryDto.image, countryId },
        })
        if (imageExists) {
          throw new BadRequestException('Image already exists');
        }
      }
      if(createImageCountryDto.video) {
        const videoExists = await this.prisma.imageCountry.findFirst({
          where: { video: createImageCountryDto.video, countryId },
        })
        if (videoExists) {
          throw new BadRequestException('Video already exists');
        }
      }
      const newImageCountry = await this.prisma.imageCountry.create({
        data: {
          ...createImageCountryDto,
          countryId,
        },
      });
      return newImageCountry;
    } catch (error) {
      throw new BadRequestException('Failed to create image country: ' + error.message);
    }
  }

  async findAll() {
    try {
      const imageCountries = await this.prisma.imageCountry.findMany();
      return imageCountries;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve image countries: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const imageCountry = await this.prisma.imageCountry.findUnique({
        where: { id },
      });
      if (!imageCountry) {
        throw new NotFoundException(`Image country with ID ${id} not found`);
      }
      return imageCountry;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve image country: ' + error.message);
    }
  }

  async update(id: number, updateImageCountryDto: UpdateImageCountryDto) {
    try {
      const existingImageCountry = await this.prisma.imageCountry.findUnique({
        where: { id },
      });
      if (!existingImageCountry) {
        throw new NotFoundException(`Image not found`);
      }

      const updatedImageCountry = await this.prisma.imageCountry.update({
        where: { id },
        data: updateImageCountryDto,
      });
      return updatedImageCountry;
    } catch (error) {
      throw new BadRequestException('Failed to update image country: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      const existingImageCountry = await this.prisma.imageCountry.findUnique({
        where: { id },
      });
      if (!existingImageCountry) {
        throw new NotFoundException(`Image not found`);
      }

      await this.prisma.imageCountry.delete({
        where: { id },
      });
      return { message: `Image has been deleted` };
    } catch (error) {
      throw new BadRequestException('Failed to delete image country: ' + error.message);
    }
  }
}