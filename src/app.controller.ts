import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserAndPostDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';
import { AppService } from '#/app.service';

@ApiTags('api')
@Controller('api')
export class AppController {
  constructor() { }
}
