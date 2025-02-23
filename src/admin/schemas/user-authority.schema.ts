import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserAuthorityDocument = UserAuthority & Document;

@Schema()
export class UserAuthority {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 1 })
  level: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserAuthoritySchema = SchemaFactory.createForClass(UserAuthority); 