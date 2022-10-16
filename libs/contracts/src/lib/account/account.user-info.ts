import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '@microservice/interfaces';

export namespace AccountUserInfo {
  export const topic = 'account.user-info.query';

  export class Request {
    @IsString()
    @IsNotEmpty()
    id: string;
  }

  export class Response {
    user: Omit<IUser, 'password'>;
  }
}
