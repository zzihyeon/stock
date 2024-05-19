import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreatePostDto } from "src/post/dto/create-post.dto";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  [key: string]: any;
}

export class CreateUserAndPostDto extends(CreatePostDto) {
  @IsString()
  username: string;
  @IsString()
  email: string;
}