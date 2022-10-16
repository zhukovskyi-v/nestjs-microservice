import {AppModule} from './app/app.module'
import {Logger} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  await app.init()
  Logger.log(`🚀 Account is inited`)
}

bootstrap()
