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
import { ContentKeyPointModule } from './content-key-point/content-key-point.module';
import { ImageCountryModule } from './image/image-country/image-country.module';
import { ConservationsModule } from './conservations/conservations.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule, AuthModule, ReviewModule, BookingModule, CountriesModule, ContentKeyPointModule, ConservationsModule,ImageCountryModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
