import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  bio: string;

  @Prop()
  likeTrack: string[];

  @Prop()
  likeAlbom: string[];

  @Prop()
  image: string;
}
export const UserShema = SchemaFactory.createForClass(User);
