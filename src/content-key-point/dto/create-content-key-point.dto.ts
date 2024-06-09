import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContentKeyPointDto {
  @ApiProperty({ description: 'A key fact about the country' })
  @IsString()
  keypoint: string;
}
