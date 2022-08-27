import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './models/user.model';
import { UserRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserModelSchema
      }
    ])
  ],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserModule {
}
