import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountUserCourses, AccountUserInfo } from '@microservice/contracts';
import { UserRepository } from './repositories';
import { UserEntity } from './entities';

@Controller()
export class UserQueries {

  constructor(private readonly repository: UserRepository) {
  }


  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(@Body() registerDto: AccountUserInfo.Request): Promise<AccountUserInfo.Response> {
    const user = await this.repository.findUserById(registerDto.id);
    const userEntity = new UserEntity(user).getUserPublicProfile();
    return { user: userEntity };
  }

  @RMQValidate()
  @RMQRoute(AccountUserCourses.topic)
  async userCourses(@Body() userCoursesDto: AccountUserCourses.Request): Promise<AccountUserCourses.Response> {
    const user = await this.repository.findUserById(userCoursesDto.id);

    return { courses: user.courses } as unknown as AccountUserCourses.Response;
  }
}
