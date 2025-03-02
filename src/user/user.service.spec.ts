import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '#/user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from '#/user/user.schema';
import { Post, PostSchema } from '#/post/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { UserRepository } from '#/user/user.repository';
import { PostRepository } from '#/post/post.repository';
import { NotImplementedException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Post.name, schema: PostSchema }
        ]),
      ],
      providers: [
        UserService,
        UserRepository,
        PostRepository,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    await mongoConnection.collection('users').deleteMany({});
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createDto = {
        email: 'test@example.com',
        password: 'password123',
        username: 'Test User',
      };

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(result.email).toBe(createDto.email);
      expect(result.username).toBe(createDto.username);

      const savedUser = await userModel.findOne({ email: createDto.email });
      expect(savedUser).toBeDefined();
      expect(savedUser.email).toBe(createDto.email);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      throw new NotImplementedException('findAll method not implemented');
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      throw new NotImplementedException('findByEmail method not implemented');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      throw new NotImplementedException('findByEmail method not implemented');
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      throw new NotImplementedException('remove method not implemented');
    });
  });
}); 