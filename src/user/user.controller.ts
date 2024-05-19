import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userSvc: UsersService
    ) {}

  @Post()
  create(@Body()input: CreateUserDto) {
    return this.userSvc.Create(input);
  }
}
