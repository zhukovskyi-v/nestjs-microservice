import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto';
import { AccountLogin, AccountRegister } from '@microservice/contracts';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @RMQRoute(AccountRegister.topic)
  register(@Body() registerDto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return this.authService.create(registerDto);
  }

  @RMQRoute(AccountLogin.topic)
  login(@Body() loginDto: AccountLogin.Request): Promise<AccountLogin.Response> {
    return this.authService.login(loginDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
