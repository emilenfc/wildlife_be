import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { BookingModule } from './booking/booking.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule, AuthModule, ReviewModule, BookingModule, CountriesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
