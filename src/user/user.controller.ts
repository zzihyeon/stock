import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userSvc: UserService
  ) { }

  @ApiOperation({ summary: '새로운 사용자 생성' })
  @ApiResponse({
    status: 201,
    description: '사용자가 성공적으로 생성됨',
    type: User
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post()
  create(@Body() input: CreateUserDto) {
    return this.userSvc.create(input);
  }
}
