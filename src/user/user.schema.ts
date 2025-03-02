// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  username: string;

  @ApiProperty()
  @Prop({ default: 0 })
  totalPosts: number;

  @Prop({ default: false })
  deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);