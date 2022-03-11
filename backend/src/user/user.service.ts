import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async findOne(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async addImage(id: string, image) {
    const imagePath = this.fileService.createFile(FileType.IMAGE, image);
    const user = await this.userModel.findById(id);
    user.image = imagePath;
    user.save();
    return user;
  }

  async addTrack(id: string, trackId: string) {
    const user = await this.userModel.findById(id);
    user.likeTrack.push(trackId);
    user.save();
    return user;
  }

  async addAlbum(id: string, albumId: string) {
    const user = await this.userModel.findById(id);
    user.likeAlbom.push(albumId);
    user.save();
    return user;
  }

  async createUser(dto: UserDto) {
    const user = await this.userModel.create({
      ...dto,
    });
    return user;
  }

  async getAll(count = 10, offset = 0) {
    const users = await this.userModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return users;
  }

  async getOne(id) {
    const user = this.userModel.findById(id);
    return user;
  }

  async search(query: string) {
    const users = await this.userModel.find({
      username: { $regen: new RegExp(query, 'i') },
    });
    return users;
  }

  async delete(id) {
    const user = await (await this.userModel.findById(id)).delete();
    return user;
  }
}
