import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user/user.service';
import { User, UserSchema } from './user/user.schema';
import { Post, PostSchema } from './post/post.schema';
import { UserRepository } from './user/user.repository';
import { PostRepository } from './post/post.repository';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo1:27017,mongo2:27018,mongo3:27019/nest?replicaSet=replDb'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema }
    ]),
  ],
  controllers: [UserController, PostController],
  providers: [AppService, UsersService, UserRepository, PostRepository],
})
export class AppModule {}
