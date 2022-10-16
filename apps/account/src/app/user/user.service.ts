import { Body, Injectable } from '@nestjs/common';
import { AccountChangeProfile } from '@microservice/contracts';
import { UserEntity } from './entities';
import { UserRepository } from './repositories';
import { RMQService } from 'nestjs-rmq';

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
}
