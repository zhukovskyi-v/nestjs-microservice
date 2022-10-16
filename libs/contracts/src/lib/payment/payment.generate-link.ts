import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export namespace PaymentGenerateLink {
  export const topic = 'payment.generate-link.command';

  export class Request {
    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    userId: string;
  }

  export class Response {
    paymentLink: string;
  }
}
