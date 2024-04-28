import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/post/post.schema';
import { CreateUserAndPostDto } from './dto/create-user.dto';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async createUserAndPost(input: CreateUserAndPostDto) {
    const session = await this.userModel.db.startSession();
    session.startTransaction();
    try {
      const user = new this.userModel({ username: input.username, email: input.email });
      await user.save({ session });

      const post = new this.postModel({ title: input.title, content: input.content, author: user._id });
      await post.save({ session });

      await session.commitTransaction();
      session.endSession();
      return post;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
