import {ConfigModule, ConfigService} from '@nestjs/config'
import {IRMQServiceOptions, IRMQServiceAsyncOptions} from 'nestjs-rmq'

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService): IRMQServiceOptions => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections: [
      {
        login: configService.get('AMQP_USER') ?? '',
        password: configService.get('AMQP_PASSWORD') ?? '',
        host: configService.get('AMQP_HOSTNAME') ?? '',
      },
    ],
    prefetchCount: 32,
    serviceName: 'microservice-account',
  }),
})
