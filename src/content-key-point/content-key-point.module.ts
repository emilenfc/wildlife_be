import { Module } from '@nestjs/common';
import { ContentKeyPointService } from './content-key-point.service';
import { ContentKeyPointController } from './content-key-point.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ContentKeyPointController],
  imports: [PrismaModule],
  providers: [ContentKeyPointService]
})
export class ContentKeyPointModule {}
