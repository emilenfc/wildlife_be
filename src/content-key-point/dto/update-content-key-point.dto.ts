import { PartialType } from '@nestjs/swagger';
import { CreateContentKeyPointDto } from './create-content-key-point.dto';

export class UpdateContentKeyPointDto extends PartialType(
  CreateContentKeyPointDto
) {}
