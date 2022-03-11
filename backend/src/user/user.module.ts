import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserShema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserShema }]),
  ],
  providers: [UserService, FileService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
