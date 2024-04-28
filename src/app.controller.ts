import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserAndPostDto } from './user/dto/create-user.dto';
import { UsersService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly userSvc: UsersService
    ) {}

  @Post('user/post')
  createUserAndPost(@Body()input: CreateUserAndPostDto) {
    return this.userSvc.createUserAndPost(input);
  }
}
