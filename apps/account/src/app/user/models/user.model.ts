import {IUser, UserRoles} from '@microservice/interfaces'
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

@Schema()
export class UserModel extends Document implements IUser {
  @Prop({required: false})
  displayName: string

  @Prop({required: true})
  email: string

  @Prop({required: true})
  password: string

  @Prop({
    required: true,
    enum: UserRoles,
    type: String,
    default: UserRoles.STUDENT,
  })
  role: UserRoles
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel)
