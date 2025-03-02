import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '#/post/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '#/post/schemas/post.schema';
import { User, UserSchema } from '#/user/user.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect } from 'mongoose';
import { UserRepository } from '#/user/user.repository';
import { PostRepository } from '#/post/post.repository';


jest.setTimeout(1000000);

async function initiateReplicaSet(connection: Connection) {
  try {
    await connection.db.admin().command({
      replSetInitiate: {
        _id: 'rs0',
        members: [{ _id: 0, host: '127.0.0.1:27021' }]
      }
    });
    console.log('✅ Replica Set Initialized Successfully');
  } catch (error) {
    console.error('❌ Replica Set Initialization Failed', error);
  }
}

async function waitForPrimary(connection: Connection) {
  let isPrimary = false;
  let attempts = 0;

  while (!isPrimary && attempts < 10) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const status = await connection.db.admin().command({ replSetGetStatus: 1 });

    if (status.members.some(member => member.stateStr === 'PRIMARY')) {
      isPrimary = true;
      console.log('🎉 Primary node is now available!');
    } else {
      console.log(`⏳ Waiting for PRIMARY... Attempt ${attempts + 1}`);
    }

    attempts++;
  }
}


describe('PostService', () => {
  let service: PostService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    console.log('🛠️ Starting MongoMemoryServer...');

    mongod = await MongoMemoryServer.create({
      binary: {
        version: '6.0.12'
      },
      instance: {
        port: 27021,
        dbName: 'test',
        storageEngine: 'wiredTiger',
        replSet: 'rs0'
      }
    });

    console.log('✅ MongoMemoryServer started!');

    const uri = mongod.getUri();
    console.log('📌 MongoDB URI:', uri);

    try {
      mongoConnection = (await connect(uri + '?replicaSet=rs0&directConnection=true', {
        serverSelectionTimeoutMS: 60000,
        connectTimeoutMS: 60000,
        heartbeatFrequencyMS: 2000,
        retryWrites: true,
        w: 'majority'
      })).connection;

      console.log('🎉 Successfully connected to MongoDB!');
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
    }
    await initiateReplicaSet(mongoConnection);
    await waitForPrimary(mongoConnection);
  }, 60000);

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri() + '?replicaSet=rs0&directConnection=true'),
        MongooseModule.forFeature([
          { name: Post.name, schema: PostSchema },
          { name: User.name, schema: UserSchema }
        ]),
      ],
      providers: [
        PostService,
        UserRepository,
        PostRepository,
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    await mongoConnection.collection('posts').deleteMany({});
    await mongoConnection.collection('users').deleteMany({});
  });

  describe('create', () => {
    it('should create a post', async () => {
      // 먼저 사용자 생성
      const user = await mongoConnection.collection('users').insertOne({
        email: 'test@example.com',
        password: 'password123',
        username: 'Test User',
        totalPosts: 0
      });

      const createDto = {
        title: 'Test Post',
        content: 'Test Content',
        author: user.insertedId.toString(),
        date: new Date(),
        index: 1,
      };

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(result.title).toBe(createDto.title);
      expect(result.content).toBe(createDto.content);
      expect(result.author).toBe(createDto.author);

      // 사용자의 totalPosts가 증가했는지 확인
      const updatedUser = await mongoConnection.collection('users').findOne({ _id: user.insertedId });
      expect(updatedUser.totalPosts).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      // Implementation needed
    });
  });

  describe('findById', () => {
    it('should return a post by id', async () => {
      // Implementation needed
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      // Implementation needed
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      // Implementation needed
    });
  });
}); 