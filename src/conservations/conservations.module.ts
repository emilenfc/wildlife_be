import { Module } from '@nestjs/common';
import { ConservationsService } from './conservations.service';
import { ConservationsController } from './conservations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ConservationsController],
  imports: [PrismaModule],
  providers: [ConservationsService]
})
export class ConservationsModule {}
