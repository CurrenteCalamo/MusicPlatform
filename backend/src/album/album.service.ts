import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Model } from 'mongoose';
import { AlbumDto } from './dto/album.dto';
@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: AlbumDto, image) {
    const imagePath = this.fileService.createFile(FileType.IMAGE, image);
    const album = await this.albumModel.create({
      ...dto,
      image: imagePath,
    });
    return album;
  }
  async dispatch(id, track) {
    const album = await this.albumModel.findById(id);
    album.track.push(track);
    album.save();
    return album;
  }
  async getAll(count = 10, offset = 0) {
    const albums = await this.albumModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return albums;
  }

  async getOne(id) {
    const album = this.albumModel.findById(id);
    return album;
  }

  async search(query: string) {
    const albums = await this.albumModel.find({
      albumname: { $regen: new RegExp(query, 'i') },
    });
    return albums;
  }

  async delete(id) {
    const album = await (await this.albumModel.findById(id)).delete();
    return album;
  }
}
