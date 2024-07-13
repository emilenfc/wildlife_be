import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsInt } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ description: 'The unique name of the country' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'A key fact about the country' })
  @IsString()
  keyfact: string;

  @ApiProperty({
    description: 'Languages spoken in the country',
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty({ description: 'Size of the country in square kilometers' })
  @IsInt()
  size: number;

  @ApiProperty({ description: 'Security level in the country' })
  @IsString()
  security: string;

  @ApiProperty({ description: 'Population of the country' })
  @IsInt()
  population: number;

  @ApiProperty({ description: 'Content describing the country' })
  @IsString()
  content: string;
}
