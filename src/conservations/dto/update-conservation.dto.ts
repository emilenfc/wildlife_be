import { PartialType } from '@nestjs/swagger';
import { CreateConservationDto } from './create-conservation.dto';

export class UpdateConservationDto extends PartialType(CreateConservationDto) {}
