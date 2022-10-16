import { IUser, IUserCourses, PurchaseState, UserRoles } from '@microservice/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserCoursesModel extends Document implements IUserCourses {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true, enum: PurchaseState, type: String })
  purchaseState: PurchaseState;

}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCoursesModel);

@Schema()
export class UserModel extends Document implements IUser {
  @Prop({ required: false })
  displayName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: UserRoles,
    type: String,
    default: UserRoles.STUDENT
  })
  role: UserRoles;

  @Prop({ type: [UserCoursesSchema], _id: false })
  courses: Types.Array<UserCoursesModel>;
}


export const UserModelSchema = SchemaFactory.createForClass(UserModel);
