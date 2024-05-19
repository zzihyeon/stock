import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsInt, IsMongoId, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsString({each:true})
  images?: string[];

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsMongoId()
  author: string;

  @ApiProperty()
  @IsInt()
  index: number;
}