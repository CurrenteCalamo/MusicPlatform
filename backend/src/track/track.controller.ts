import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TrackDto } from './dto/track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('id/:id')
  listen(@Param('id') id: string) {
    this.trackService.listen(id);
    return this.trackService.listen(id);
  }

  @Get('getAll')
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get('query')
  search(@Query('query') query) {
    return this.trackService.search(query);
  }

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: TrackDto) {
    const { image, audio } = files;
    return this.trackService.create(dto, image[0], audio[0]);
  }
}
