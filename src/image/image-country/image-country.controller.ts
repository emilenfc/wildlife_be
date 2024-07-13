import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { ImageCountryService } from './image-country.service';
import { CreateImageCountryDto } from './dto/create-image-country.dto';
import { UpdateImageCountryDto } from './dto/update-image-country.dto';
import { ApiParam, ApiBody } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/utils/config/multer.config';
@Controller('image-country')
@ApiTags('image-country')
export class ImageCountryController {
  constructor(private readonly imageCountryService: ImageCountryService) {}

  @Post(':countryId')
  @UseInterceptors(FilesInterceptor('files', null, multerConfig))
  @ApiParam({ name: 'countryId', description: 'The ID of the country' })
  async uploadFile(
    @Param('countryId') countryId: string,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    const uploadedMedia = files.map(async (file) => {
      return await this.imageCountryService.create(countryId, file);
    });
    return await Promise.all(uploadedMedia);
  }

  @Get()
  findAll() {
    return this.imageCountryService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the image country' })
  findOne(@Param('id') id: string) {
    return this.imageCountryService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'The ID of the image country' })
  @ApiBody({ type: UpdateImageCountryDto })
  update(
    @Param('id') id: string,
    @Body() updateImageCountryDto: UpdateImageCountryDto
  ) {
    return this.imageCountryService.update(+id, updateImageCountryDto);
  }
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'The ID of the image country' })
  remove(@Param('id') id: string) {
    return this.imageCountryService.remove(+id);
  }
}
