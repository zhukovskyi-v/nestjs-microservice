import { UserRoles } from '@microservice/interfaces';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    displayName: string;

    @IsString()
    @IsOptional()
    role?: UserRoles;
  }

  export class Response {
    displayName: string;
    email: string;
    role: UserRoles;
    _id: string;
  }
}
