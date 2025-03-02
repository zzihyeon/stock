import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostRepository } from '#/post/post.repository';
import { Post } from '#/post/post.schema';
import { CreateUserAndPostDto, CreateUserDto } from '#/user/dto/create-user.dto';
import { UserRepository } from '#/user/user.repository';
import { User } from '#/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository<User>,
    private readonly postRepo: PostRepository<Post>,
  ) { }

  async create(input: CreateUserDto) {
    return this.userRepo.create(input);
  }

  async delete(id: string) {
    return this.userRepo.delete(id);
  }

}
