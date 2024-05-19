import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsString({each:true})
  images?: string[];

  @ApiPropertyOptional()
  @IsDate()
  date?: Date;
}