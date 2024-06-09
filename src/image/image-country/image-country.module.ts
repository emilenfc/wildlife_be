import { Module } from '@nestjs/common';
import { ImageCountryService } from './image-country.service';
import { ImageCountryController } from './image-country.controller';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  controllers: [ImageCountryController],
  imports: [PrismaModule],
  providers: [ImageCountryService],
})
export class ImageCountryModule {}
