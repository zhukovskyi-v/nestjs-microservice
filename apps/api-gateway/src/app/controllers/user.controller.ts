import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AccountBuyCourse } from '@microservice/contracts';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../guards';

@Controller('user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {
  }

  // @UseGuards(JwtAuthGuard)
  @Post('buy-course')
  async buyCourse(@Body() dto: AccountBuyCourse.Request) {
    try {
      return await this.rmqService.send<AccountBuyCourse.Request, AccountBuyCourse.Response>(AccountBuyCourse.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
