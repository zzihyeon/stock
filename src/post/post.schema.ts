// post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  images: string[];

  @Prop()
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User | Types.ObjectId;

  @Prop({ default: false })
  deletd: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ user: 1 })