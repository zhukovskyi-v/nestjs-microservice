/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {AppModule} from './app/app.module'
import {Logger} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3333
  await app.listen(port)
  Logger.log(
    `🚀 API-GATEWAY is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

bootstrap()
