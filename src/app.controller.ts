import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserAndPostDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';
import { AppService } from '#/app.service';

@Controller('api')
export class AppController {
  constructor() { }
}
