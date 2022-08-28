import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  }

  export class Response {
    accessToken: string;
  }
}
