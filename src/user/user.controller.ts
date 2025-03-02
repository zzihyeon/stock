import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userSvc: UserService
  ) { }

  @ApiResponse({
    status: 201,
    type: User
  })
  @Post()
  create(@Body() input: CreateUserDto) {
    return this.userSvc.create(input);
  }
}
