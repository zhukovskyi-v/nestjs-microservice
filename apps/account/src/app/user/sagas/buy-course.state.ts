import {UserEntity} from '../entities'
import {BuyCourseSaga} from './buy-course.saga'

export abstract class BuyCourseSageState {
  public saga: BuyCourseSaga

  public setContext(saga: BuyCourseSaga): void {
    this.saga = saga
  }

  public abstract pay(): Promise<{paymentLink: string; user: UserEntity}>

  public abstract checkPayment(): Promise<{user: UserEntity; status: string}>

  public abstract cancelPayment(): Promise<{user: UserEntity}>
}
