import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities';
import { UserModel } from '../models/user.model';
import { PurchaseState } from '@microservice/interfaces';

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

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });

  }

  async findUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async deleteUserByEmail(email: string) {
    await this.userModel.deleteOne({ email }).exec();
    return true;
  }

  async buyCourse(id: string) {
    return this.userModel.findByIdAndUpdate(id, {
      $set: {
        courses: [{
          courseId: 'lorem',
          purchaseState: PurchaseState.WaitingForPayment
        }]
      }
    }).exec();
  }

  async changeProfile({ _id, ...rest }: UserEntity) {
    return this.userModel.updateOne({ _id }, { $set: rest }).exec();
  }
}
