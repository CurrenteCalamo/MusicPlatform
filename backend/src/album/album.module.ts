import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FileService } from 'src/file/file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumShema } from './schemas/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumShema }]),
  ],
  providers: [AlbumService, FileService],
  controllers: [AlbumController],
})
export class AlbumModule {}
