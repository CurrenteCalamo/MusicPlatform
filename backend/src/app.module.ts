import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { AppController } from './app.controller';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    MongooseModule.forRoot(process.env.MONGODB),
    UserModule,
    FileModule,
    TrackModule,
    AlbumModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
