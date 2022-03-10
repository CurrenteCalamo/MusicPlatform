import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AlbumDocument = Album & Document;
@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  image: string;

  @Prop()
  likes: number;

  @Prop()
  track: string[];

  @Prop()
  creator: string;
}
export const AlbumShema = SchemaFactory.createForClass(Album);
