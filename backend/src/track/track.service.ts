import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { TrackDto } from './dto/track.dto';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async getAll(count = 10, offset = 0) {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return tracks;
  }

  async listen(id) {
    const track = await this.trackModel.findById(id);
    track.listens = +1;
    track.save();
  }

  async search(query: string) {
    const tracks = await this.trackModel.find({
      name: { $regen: new RegExp(query, 'i') },
    });
    return tracks;
  }

  async delete(id) {
    const track = await (await this.trackModel.findById(id)).delete();
    return track;
  }

  async create(dto: TrackDto, image, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const imagePath = this.fileService.createFile(FileType.IMAGE, image);
    const track = await this.trackModel.create({
      ...dto,
      audio: audioPath,
      image: imagePath,
    });
    return track;
  }
}
