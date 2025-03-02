import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/user.schema';
import { Post as Posts, PostSchema } from './post/post.schema';
import { UserRepository } from './user/user.repository';
import { PostRepository } from './post/post.repository';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { redisConfig } from './common/config/redis.config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo1:27017,mongo2:27018,mongo3:27019/nest?replicaSet=replDb'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Posts.name, schema: PostSchema }
    ]),
    redisConfig,
    AdminModule,
  ],
  controllers: [AppController, UserController, PostController],
  providers: [AppService, UserService, PostService, UserRepository, PostRepository],
})
export class AppModule { }
