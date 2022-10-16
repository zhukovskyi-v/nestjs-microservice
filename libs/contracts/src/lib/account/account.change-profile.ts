import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser, IUserCourses } from '@microservice/interfaces';

export namespace AccountChangeProfile {
  export const topic = 'account.change-profile.command';

  export class Request {
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    user: Pick<IUser, 'displayName' | 'email' | 'password'>;
  }

  export class Response {

  }
}
