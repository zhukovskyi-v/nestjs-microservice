import { IsNotEmpty, IsString } from 'class-validator';
import { ICourse, IUser } from '@microservice/interfaces';

export namespace CourseGetCourse {
  export const topic = 'course.get-course.query';

  export class Request {
    @IsString()
    @IsNotEmpty()
    id: string;
  }

  export class Response {
    course: ICourse;
  }
}
