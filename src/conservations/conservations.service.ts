import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConservationDto } from './dto/create-conservation.dto';
import { UpdateConservationDto } from './dto/update-conservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConservationsService {
  constructor(private prisma: PrismaService) {}
  async create(createConservationsDto: CreateConservationDto) {
    const newEntry = await this.prisma.conservation.create({
      data: {
        place: createConservationsDto.place,
        image: createConservationsDto.image,
        date: createConservationsDto.date,
        description: createConservationsDto.description
      }
    });

    if (!newEntry) throw new BadRequestException('Conservation not created');

    return newEntry;
  }

  async findAll() {
    const data = this.prisma.conservation.findMany();
    if (!data) throw new BadRequestException('Conservation not found');
    return data;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Conservation ID must be provided');
    const data = this.prisma.conservation.findUnique({ where: { id } });
    if (!data) throw new BadRequestException('Conservation not found');
    return data;
  }

  async update(id: string, updateConservationsDto: UpdateConservationDto) {
    if (!id) throw new BadRequestException('Conservation ID must be provided');
    const data = await this.prisma.conservation.update({
      where: { id },
      data: updateConservationsDto
    });
    if (!data) throw new BadRequestException('Conservation not updated');
    return data;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('Conservation ID must be provided');
    const data = await this.prisma.conservation.delete({ where: { id } });
    if (!data) throw new BadRequestException('Conservation not deleted');
    return data;
  }
}
