import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackShema } from './schemas/track.schema';
import { TrackController } from './track.controller';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackShema }]),
  ],

  providers: [TrackService, FileService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
