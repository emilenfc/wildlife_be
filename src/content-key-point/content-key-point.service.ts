import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateContentKeyPointDto } from './dto/create-content-key-point.dto';
import { UpdateContentKeyPointDto } from './dto/update-content-key-point.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentKeyPointService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    countryId: string,
    createContentKeyPointDto: CreateContentKeyPointDto
  ) {
    try {
      const newContentKeyPoint = await this.prisma.contentKeyPoint.create({
        data: {
          ...createContentKeyPointDto,
          countryId
        }
      });
      return newContentKeyPoint;
    } catch (error) {
      throw new BadRequestException(
        'Failed to create content key point: ' + error.message
      );
    }
  }

  async findAll() {
    try {
      const contentKeyPoints = await this.prisma.contentKeyPoint.findMany();
      return contentKeyPoints;
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve content key points: ' + error.message
      );
    }
  }

  async findOne(id: number) {
    try {
      const contentKeyPoint = await this.prisma.contentKeyPoint.findUnique({
        where: { id }
      });
      if (!contentKeyPoint) {
        throw new NotFoundException(`Content key point not found`);
      }
      return contentKeyPoint;
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve content key point: ' + error.message
      );
    }
  }

  async update(id: number, updateContentKeyPointDto: UpdateContentKeyPointDto) {
    try {
      const existingContentKeyPoint =
        await this.prisma.contentKeyPoint.findUnique({
          where: { id }
        });
      if (!existingContentKeyPoint) {
        throw new NotFoundException(`Content key point not found`);
      }

      const updatedContentKeyPoint = await this.prisma.contentKeyPoint.update({
        where: { id },
        data: updateContentKeyPointDto
      });
      return updatedContentKeyPoint;
    } catch (error) {
      throw new BadRequestException(
        'Failed to update content key point: ' + error.message
      );
    }
  }

  async remove(id: number) {
    try {
      const existingContentKeyPoint =
        await this.prisma.contentKeyPoint.findUnique({
          where: { id }
        });
      if (!existingContentKeyPoint) {
        throw new NotFoundException(`Content key point not found`);
      }

      await this.prisma.contentKeyPoint.delete({
        where: { id }
      });
      return { message: `Content key point as been deleted` };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete content key point: ' + error.message
      );
    }
  }
}
