import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Posts } from './post.schema';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postSvc: PostService
  ) { }

  @ApiResponse({
    type: Posts
  })
  @Post()
  create(@Body() input: CreatePostDto) {
    return this.postSvc.create(input);
  }

  @ApiResponse({
    type: Posts
  })
  @Put(':id')
  update(@Body() input: UpdatePostDto, @Param('id') id: string) {
    return this.postSvc.update(id, input);
  }
}
