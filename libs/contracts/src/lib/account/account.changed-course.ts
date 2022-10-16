import { IsNotEmpty, IsString } from 'class-validator';
import { PurchaseState } from '@microservice/interfaces';

export namespace AccountChangedCourse {
  export const topic = 'account.changed-course.event';

  export class Request {
    @IsString()
    courseId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    status: PurchaseState;
  }
}
