import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateImageCountryDto {
    @IsOptional()
    @ApiProperty()
    @IsString()
    image: string;
    
    @IsOptional()
    @ApiProperty()
    @IsString()
    video: string;
}