import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostRepository } from '#/post/post.repository';
import { Post } from '#/post/post.schema';
import { UserRepository } from '#/user/user.repository';
import { UserDocument } from '#/user/user.schema';
import { CreatePostDto } from '#/post/dto/create-post.dto';
import { UpdatePostDto } from '#/post/dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly userRepo: UserRepository<UserDocument>,
    private readonly postRepo: PostRepository<Post>,
  ) { }

  async create(input: CreatePostDto) {
    const session = await this.userRepo.getSession();
    session.startTransaction();
    try {
      const user = await this.userRepo.update(input.author, { $inc: { totalPosts: 1 } }, session);
      const post = await this.postRepo.create({ title: input.title, content: input.content, author: user._id.toString(), date: new Date(), index: user.totalPosts }, session);
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
