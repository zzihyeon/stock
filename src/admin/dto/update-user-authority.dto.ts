import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAuthorityDto } from './create-user-authority.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { UserAuthorityType } from '../enums/user-authority.enum';

export class UpdateUserAuthorityDto extends PartialType(CreateUserAuthorityDto) {
  @IsEnum(UserAuthorityType)
  @IsOptional()
  authority?: UserAuthorityType;
} 