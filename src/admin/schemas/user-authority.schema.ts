import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserAuthorityType } from '../enums/user-authority.enum';

export type UserAuthorityDocument = HydratedDocument<UserAuthority>;

@Schema({ timestamps: true })
export class UserAuthority {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, enum: UserAuthorityType, default: UserAuthorityType.GUEST })
  authority: UserAuthorityType;
}

export const UserAuthoritySchema = SchemaFactory.createForClass(UserAuthority); 