import {
  Controller,
  Body,
  Post, UnauthorizedException
} from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@microservice/contracts';
import { RMQService } from 'nestjs-rmq';
import { LoginDto, RegisterDto } from '../dtos';

@Controller('auth')
export class AuthController {

  constructor(private readonly rmqService: RMQService) {
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, registerDto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, loginDto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
