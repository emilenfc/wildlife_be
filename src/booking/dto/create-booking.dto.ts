import { IsString, IsOptional, IsInt, IsArray, IsEnum, IsBoolean, IsDate, } from 'class-validator';
import { Type } from 'class-transformer';
import { ContactPreference } from '@prisma/client'; 
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateBookingDto {
    @IsString()
    @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  secondName: string;

  @IsString()
  @ApiPropertyOptional({ type: String })
  midName?: string;

  @IsString()
  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  phone?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  messsage?: string;

  @ApiProperty({ enum: ContactPreference })
  @IsEnum(ContactPreference)
  contactPrefered: ContactPreference;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  placeChosen: string[];

  @ApiPropertyOptional()
  @ApiProperty()
  @IsInt()
  travelingWith?: number;

  
  @IsOptional()
  @ApiProperty()
  timeToStart?: Date;


  @ApiProperty()
  @IsOptional()
  timeToEnd?: Date;

  @ApiPropertyOptional({ type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  travelAnytime?: boolean ;
}

export class UpdateContactedDto {
  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  contacted: boolean;
}