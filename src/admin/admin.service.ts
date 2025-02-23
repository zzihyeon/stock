import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthority, UserAuthorityDocument } from './schemas/user-authority.schema';
import { CreateUserAuthorityDto } from './dto/create-user-authority.dto';
import { UpdateUserAuthorityDto } from './dto/update-user-authority.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(UserAuthority.name)
    private userAuthorityModel: Model<UserAuthorityDocument>,
  ) {}

  async create(createUserAuthorityDto: CreateUserAuthorityDto): Promise<UserAuthority> {
    const createdAuthority = new this.userAuthorityModel(createUserAuthorityDto);
    return createdAuthority.save();
  }

  async findAll(): Promise<UserAuthority[]> {
    return this.userAuthorityModel.find().exec();
  }

  async findOne(userId: string): Promise<UserAuthority> {
    return this.userAuthorityModel.findOne({ userId }).exec();
  }

  async update(userId: string, updateUserAuthorityDto: UpdateUserAuthorityDto): Promise<UserAuthority> {
    return this.userAuthorityModel
      .findOneAndUpdate({ userId }, updateUserAuthorityDto, { new: true })
      .exec();
  }

  async remove(userId: string): Promise<UserAuthority> {
    return this.userAuthorityModel.findOneAndDelete({ userId }).exec();
  }
} 