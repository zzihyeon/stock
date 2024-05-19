import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostRepository } from 'src/post/post.repository';
import { Post } from 'src/post/post.schema';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userRepo: UserRepository<User>,
    private readonly postRepo: PostRepository<Post>,
  ) { }

  async create(input: CreatePostDto) {
    const session = await this.userRepo.getSession();
    session.startTransaction();
    try {
      const user = await this.userRepo.update(input.author, { $inc: { totalPosts: 1 } }, session);
      const post = await this.postRepo.create({ title: input.title, content: input.content, author: user._id, date: new Date(), index: user.totalPosts }, session);
      await session.commitTransaction();
      return post;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async update(id: string, input: UpdatePostDto) {
    return this.postRepo.update(id, input);
  }

  async delete(id: string) {
    return this.postRepo.delete(id);
  }
}
