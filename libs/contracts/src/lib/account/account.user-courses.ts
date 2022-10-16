import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser, IUserCourses } from '@microservice/interfaces';

export namespace AccountUserCourses {
  export const topic = 'account.user-courses.query';

  export class Request {
    @IsString()
    @IsNotEmpty()
    id: string;
  }

  export class Response {
    courses: IUserCourses;
  }
}
