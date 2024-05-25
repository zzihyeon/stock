import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, ClientSession } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostRepository<T extends Document> {
  constructor(@InjectModel('Posts') private readonly model: Model<T>) { }

  async getSession() {
    return this.model.db.startSession()
  }

  async create(createDto: CreatePostDto, session?: ClientSession): Promise<T> {
    const createdObj = new this.model(createDto);
    return createdObj.save({ session });
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateDto: UpdatePostDto, session?: ClientSession): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true, session }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { deleted: true }).exec();
  }
}
