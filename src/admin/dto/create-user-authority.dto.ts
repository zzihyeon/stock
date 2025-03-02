import { UserAuthorityType } from '../enums/user-authority.enum';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserAuthorityDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserAuthorityType)
  @IsNotEmpty()
  authority: UserAuthorityType;
} 