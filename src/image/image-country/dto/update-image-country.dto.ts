import { PartialType } from '@nestjs/swagger';
import { CreateImageCountryDto } from './create-image-country.dto';

export class UpdateImageCountryDto extends PartialType(CreateImageCountryDto) {}
