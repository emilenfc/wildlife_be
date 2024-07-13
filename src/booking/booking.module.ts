import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [BookingController],
  imports: [PrismaModule],
  providers: [BookingService]
})
export class BookingModule {}
