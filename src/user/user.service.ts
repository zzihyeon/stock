import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostRepository } from 'src/post/post.repository';
import { Post } from 'src/post/post.schema';
import { CreateUserAndPostDto, CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository<User>,
    private readonly postRepo: PostRepository<Post>,
  ) { }

  async Create(input: CreateUserDto){
    return this.userRepo.create(input);
  }

  async Delete(id: string){
    return this.userRepo.delete(id);
  }

}
