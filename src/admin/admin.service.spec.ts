import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserAuthority } from './schemas/user-authority.schema';
import { Model } from 'mongoose';
import { CreateUserAuthorityDto } from './dto/create-user-authority.dto';
import { UpdateUserAuthorityDto } from './dto/update-user-authority.dto';
import { UserAuthorityType } from './enums/user-authority.enum';

describe('AdminService', () => {
  let service: AdminService;
  let model: Model<UserAuthority>;

  const mockUserAuthority = {
    userId: 'testUserId',
    authority: UserAuthorityType.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserAuthorityModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(UserAuthority.name),
          useValue: mockUserAuthorityModel,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    model = module.get<Model<UserAuthority>>(getModelToken(UserAuthority.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user authority', async () => {
      const createDto: CreateUserAuthorityDto = {
        userId: 'testUserId',
        authority: UserAuthorityType.ADMIN,
      };

      jest.spyOn(model, 'create').mockResolvedValue(mockUserAuthority as any);

      const result = await service.create(createDto);
      expect(result).toEqual(mockUserAuthority);
    });
  });

  describe('findAll', () => {
    it('should return all user authorities', async () => {
      jest.spyOn(model, 'find').mockResolvedValue([mockUserAuthority] as any);

      const result = await service.findAll();
      expect(result).toEqual([mockUserAuthority]);
    });
  });

  describe('findOne', () => {
    it('should return a user authority by userId', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockUserAuthority as any);

      const result = await service.findOne('testUserId');
      expect(result).toEqual(mockUserAuthority);
    });
  });

  describe('update', () => {
    it('should update a user authority', async () => {
      const updateDto: UpdateUserAuthorityDto = {
        authority: UserAuthorityType.USER,
      };

      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue({
        ...mockUserAuthority,
        authority: UserAuthorityType.USER,
      } as any);

      const result = await service.update('testUserId', updateDto);
      expect(result.authority).toEqual(UserAuthorityType.USER);
    });
  });

  describe('remove', () => {
    it('should remove a user authority', async () => {
      jest.spyOn(model, 'findOneAndDelete').mockResolvedValue(mockUserAuthority as any);

      const result = await service.remove('testUserId');
      expect(result).toEqual(mockUserAuthority);
    });
  });
}); 