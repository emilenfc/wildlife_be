import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    // return 'This action adds a new article';
    return this.prisma.article.create({ data: createArticleDto });
  }
  findAllDraft() {
    return this.prisma.article.findMany({
      where: { published: false }
    });
  }
  findAll() {
    // return `This action returns all articles`;
    return this.prisma.article.findMany();
  }

  findOne(id: string) {
    // return `This action returns a #${id} article`;
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true
      }
    });
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    // return `This action updates a #${id} article`;
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto
    });
  }

  remove(id: string) {
    // return `This action removes a #${id} article`;
    return this.prisma.article.delete({
      where: { id }
    });
  }
}
