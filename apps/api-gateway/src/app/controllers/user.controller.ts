import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, UserId } from '../guards';
import { AccountRegister } from '@microservice/contracts';


@Controller('user')
export class UserController {
  constructor() {
  }

  @UseGuards(JwtAuthGuard)
  @Post('info')
  async info(@UserId() userId: string) {
  }
}
