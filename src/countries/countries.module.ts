import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CountriesController],
  imports: [PrismaModule],
  providers: [CountriesService]
})
export class CountriesModule {}
