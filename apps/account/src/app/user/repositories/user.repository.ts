import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UserEntity } from '../entities';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {
  }

  async createUser(user: UserEntity): Promise<UserModel> {
    const newUser = await new this.userModel(user);
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    return this.userModel.findOne({ email });

  }

  async deleteUserByEmail(email: string) {
    await this.userModel.deleteOne({ email }).exec();
    return true;
  }
}
