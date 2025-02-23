import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserAuthorityDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  level: number;
} 