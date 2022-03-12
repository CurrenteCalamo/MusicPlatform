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
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('addImage')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  addImage(@UploadedFiles() files, @Query('id') id: string) {
    const { image } = files;
    return this.userService.addImage(id, image[0]);
  }

  @Post('createUser')
  createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }

  @Post('addTrack')
  addTrack(@Query('id') id: string, @Query('trackId') trackId: string) {
    return this.userService.addTrack(id, trackId);
  }

  @Post('addAbum')
  addUser(@Query('id') id: string, @Query('userId') albumId: string) {
    return this.userService.addAlbum(id, albumId);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.userService.getAll(count, offset);
  }
  @Get('query')
  search(@Query('query') query: string) {
    return this.userService.search(query);
  }
}
