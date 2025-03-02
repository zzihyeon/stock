import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreatePostDto } from "#/post/dto/create-post.dto";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  [key: string]: any;
}

export class CreateUserAndPostDto extends (CreatePostDto) {
  @IsString()
  username: string;
  @IsString()
  email: string;
}