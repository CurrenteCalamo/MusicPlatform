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

  @Get('/id:id')
  listen(@Param('id') id: string) {
    this.trackService.listen(id);
    return this.trackService.listen(id);
  }
  @Get('id')
  getOne(@Query('id') id: string) {
    return this.trackService.getOne(id);
  }
  @Get('search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }
  @Get('searchCreator')
  searchCreator(@Query('id') id: string) {
    return this.trackService.searchCreator(id);
  }
  @Get('getAll')
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
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
  @Get('delete')
  delete(@Query('id') id: number) {
    this.trackService.delete(id);
  }
}
