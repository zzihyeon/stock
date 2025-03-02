import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthority } from '#/admin/schemas/user-authority.schema';
import { CreateUserAuthorityDto } from '#/admin/dto/create-user-authority.dto';
import { UpdateUserAuthorityDto } from '#/admin/dto/update-user-authority.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(UserAuthority.name) private userAuthorityModel: Model<UserAuthority>
  ) { }

  async create(createUserAuthorityDto: CreateUserAuthorityDto): Promise<UserAuthority> {
    return await this.userAuthorityModel.create(createUserAuthorityDto);
  }

  async findAll() {
    return await this.userAuthorityModel.find();
  }

  async findOne(userId: string) {
    return await this.userAuthorityModel.findOne({ userId });
  }

  async update(userId: string, updateUserAuthorityDto: UpdateUserAuthorityDto) {
    return await this.userAuthorityModel.findOneAndUpdate(
      { userId },
      updateUserAuthorityDto,
      { new: true }
    );
  }

  async remove(userId: string) {
    return await this.userAuthorityModel.findOneAndDelete({ userId });
  }
}  