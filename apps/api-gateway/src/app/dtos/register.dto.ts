import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '@microservice/interfaces';

export class RegisterDto {
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
