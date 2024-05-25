// post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Posts extends Document {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty({ type: [String] })
  @Prop()
  images: string[];

  @ApiProperty({ type: Date })
  @Prop()
  date: Date;

  @ApiProperty({ type: User })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User | Types.ObjectId;

  @Prop({ default: false })
  deletd: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
PostSchema.index({ user: 1 })