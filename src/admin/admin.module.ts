import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserAuthority, UserAuthoritySchema } from './schemas/user-authority.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAuthority.name, schema: UserAuthoritySchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {} 