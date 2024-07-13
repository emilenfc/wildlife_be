import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateConservationDto {
  @IsString()
  @ApiProperty()
  place: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsDateString()
  @ApiProperty()
  date: Date;

  @IsString()
  @ApiProperty()
  description: string;
}
