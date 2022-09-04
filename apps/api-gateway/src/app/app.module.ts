import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { AuthController } from './controllers';
import { getRMQConfig } from './configs/rmq.config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: 'envs/.api-gateway.env',
    isGlobal: true
  }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule],
  controllers: [AuthController, UserController],
  providers: []
})
export class AppModule {
}
