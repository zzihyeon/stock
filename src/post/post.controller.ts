import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postSvc: PostsService
  ) { }

  @Post()
  create(@Body() input: CreatePostDto) {
    return this.postSvc.create(input);
  }

  @Put(':id')
  update(@Body() input: UpdatePostDto, @Param('id') id: string) {
    return this.postSvc.update(id, input);
  }
}
