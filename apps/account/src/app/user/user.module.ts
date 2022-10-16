import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './models/user.model';
import { UserRepository } from './repositories';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';
import { UserService } from './user.service';
import { UserEventEmitter } from './user-event-emitter';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserModelSchema
      }
    ])
  ],
  providers: [UserRepository, UserService, UserEventEmitter],
  exports: [UserRepository],
  controllers: [UserCommands, UserQueries]
})
export class UserModule {
}
