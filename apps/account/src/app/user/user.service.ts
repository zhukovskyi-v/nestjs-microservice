import { Body, Injectable } from '@nestjs/common';
import { AccountBuyCourse, AccountChangeProfile, AccountCheckPayment } from '@microservice/contracts';
import { UserEntity } from './entities';
import { UserRepository } from './repositories';
import { RMQService } from 'nestjs-rmq';
import { BuyCourseSaga } from './sagas';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly rmqService: RMQService) {
  }

  async changeProfile(@Body() { user, id }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) {
      throw new Error(`User ${id} does not exists in the database`);
    }

    const userEntity = new UserEntity(existedUser).changeProfile(user);
    await this.userRepository.changeProfile(userEntity);
    return {};
  }

  async buyCourse(@Body() { userId, courseId }: AccountBuyCourse.Request): Promise<AccountBuyCourse.Response> {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) {
      throw new Error(`User ${userId} not found`);
    }
    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { paymentLink, user } = await saga.getState().pay();
    await this.userRepository.changeProfile(user);
    return { paymentLink };
  }

  async checkPayment(@Body() { userId, courseId }: AccountCheckPayment.Request): Promise<AccountCheckPayment.Response> {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) {
      throw new Error(`User ${userId} not found`);
    }
    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, status } = await saga.getState().checkPayment();
    await this.userRepository.changeProfile(user);
    return { status };
  }
}
