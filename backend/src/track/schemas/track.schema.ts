import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  image: string;

  @Prop()
  audio: string;

  @Prop()
  likes: number;

  @Prop()
  listens: number;

  @Prop()
  creator: string;
}
export const TrackShema = SchemaFactory.createForClass(Track);
