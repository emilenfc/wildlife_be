import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  create(createReviewDto: CreateReviewDto) {
    const data = this.prisma.review.create({ data: createReviewDto });
    if (!data) {
      throw new BadRequestException('review not created');
    }
    return data;
  }
  findAll() {
    const data = this.prisma.review.findMany();
    if (!data) {
      throw new NotFoundException('review not found');
    }
    return data;
  }

  findOne(id: string) {
    const data = this.prisma.review.findFirst({ where: { id } });
    if (!data) {
      throw new NotFoundException('review not found');
    }
    return data;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findFirst({ where: { id } });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    const data = await this.prisma.review.update({
      where: { id },
      data: updateReviewDto
    });

    return data;
  }

  async remove(id: string) {
    const review = await this.prisma.review.findFirst({ where: { id } });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    const data = await this.prisma.review.delete({ where: { id } });
    return data;
  }
}
