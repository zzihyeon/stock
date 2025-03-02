import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '#/post/post.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from '#/post/schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from '#/post/dto/create-post.dto';
import { UpdatePostDto } from '#/post/dto/update-post.dto';
import { NotImplementedException } from '@nestjs/common';
import { UserRepository } from '#/user/user.repository';
import { PostRepository } from '#/post/post.repository';

describe('PostService', () => {
  let service: PostService;
  let model: Model<Post>;

  const mockPost = {
    title: 'Test Post',
    content: 'Test Content',
    author: 'testUserId',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPostModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockSession = {
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
  };

  const mockUser = {
    _id: 'testUserId',
    totalPosts: 1,
  };

  const mockUserRepository = {
    update: jest.fn().mockResolvedValue(mockUser),
    getSession: jest.fn().mockResolvedValue(mockSession),
  };

  const mockPostRepository = {
    create: jest.fn().mockResolvedValue(mockPost),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: PostRepository,
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    model = module.get<Model<Post>>(getModelToken(Post.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createDto: CreatePostDto = {
        title: 'Test Post',
        content: 'Test Content',
        author: 'testUserId',
        date: new Date(),
        index: 1,
      };

      const result = await service.create(createDto);
      expect(result).toEqual(mockPost);
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      throw new NotImplementedException('findAll method not implemented');
    });
  });

  describe('findById', () => {
    it('should return a post by id', async () => {
      throw new NotImplementedException('findById method not implemented');
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const updateDto: UpdatePostDto = {
        title: 'Updated Title',
      };

      const updatedPost = { ...mockPost, title: 'Updated Title' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedPost as any);

      const result = await service.update('testId', updateDto);
      expect(result.title).toEqual('Updated Title');
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      throw new NotImplementedException('remove method not implemented');
    });
  });
}); 