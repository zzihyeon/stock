import { CreatePostDto } from "src/post/dto/create-post.dto";

export class CreateUserDto {
  username: string;
  email: string;
}

export class CreateUserAndPostDto extends(CreatePostDto) {
  username: string;
  email: string;
}