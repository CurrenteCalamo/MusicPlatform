import { Controller } from '@nestjs/common';
import { AlbumService } from './album.service';
import {
  Body,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AlbumDto } from './dto/album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get('getAll')
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @Get('/id:id')
  getOne(@Param('id') id: string) {
    return this.albumService.getOne(id);
  }

  @Get('query')
  search(@Query('query') query: string) {
    return this.albumService.search(query);
  }
  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: AlbumDto) {
    const { image } = files;
    return this.albumService.create(dto, image[0]);
  }
  @Post('dispatch')
  dispatch(@Query('id') id: string, @Query('trackId') trackId: string) {
    return this.albumService.dispatch(id, trackId);
  }
}
