import {UserEntity} from '../entities'
import {BuyCourseSageState} from './buy-course.state'
import {
  CourseGetCourse,
  PaymentCheck,
  PaymentGenerateLink,
} from '@microservice/contracts'
import {PurchaseState} from '@microservice/interfaces'

export class BuyCourseSagaStateStarted extends BuyCourseSageState {
  public async pay(): Promise<{paymentLink: string; user: UserEntity}> {
    const {course} = await this.saga.rmqService.send<
      CourseGetCourse.Request,
      CourseGetCourse.Response
    >(CourseGetCourse.topic, {id: this.saga.courseId})
    if (!course) {
      throw new Error(`Course not found`)
    }
    if (course.price === 0) {
      this.saga.setState(PurchaseState.Purchased, course._id)
      return {paymentLink: null, user: this.saga.user}
    }

    const {paymentLink} = await this.saga.rmqService.send<
      PaymentGenerateLink.Request,
      PaymentGenerateLink.Response
    >(PaymentGenerateLink.topic, {
      courseId: course._id,
      price: course.price,
      userId: this.saga.user._id,
    })

    this.saga.setState(PurchaseState.WaitingForPayment, course._id)
    return {user: this.saga.user, paymentLink}
  }

  public async cancelPayment(): Promise<{user: UserEntity}> {
    this.saga.setState(PurchaseState.Cancelled, this.saga.courseId)
    return {user: this.saga.user}
  }

  public checkPayment(): Promise<{user: UserEntity; status: string}> {
    throw new Error(`You cannot check payment witch doesnt started`)
  }
}

export class BuyCourseSageStateProcess extends BuyCourseSageState {
  public async pay(): Promise<{paymentLink: string; user: UserEntity}> {
    throw new Error(
      'Sorry, you cannot pay for course which has already in progress',
    )
  }

  public async checkPayment(): Promise<{user: UserEntity; status: string}> {
    const {status} = await this.saga.rmqService.send<
      PaymentCheck.Request,
      PaymentCheck.Response
    >(PaymentCheck.topic, {
      courseId: this.saga.courseId,
      userId: this.saga.user._id,
    })
    if (status === 'canceled') {
      this.saga.setState(PurchaseState.Cancelled, this.saga.courseId)
    }

    if (status !== 'success') {
      return {user: this.saga.user, status}
    }

    this.saga.setState(PurchaseState.Purchased, this.saga.courseId)
    return {user: this.saga.user, status}
  }

  public async cancelPayment(): Promise<{user: UserEntity}> {
    throw new Error(`Sorry, you cannot cancel canceled course`)
  }
}

export class BuyCourseSageStateFinished extends BuyCourseSageState {
  pay(): Promise<{paymentLink: string; user: UserEntity}> {
    throw new Error(`Sorry, you cannot pay already bought course`)
  }

  checkPayment(): Promise<{user: UserEntity; status: string}> {
    throw new Error(`Sorry, you cannot check already bought course`)
  }

  cancelPayment(): Promise<{user: UserEntity}> {
    throw new Error(`Sorry, you cannot cancel already bought course`)
  }
}

export class BuyCourseSageStateCancel extends BuyCourseSageState {
  pay(): Promise<{paymentLink: string; user: UserEntity}> {
    throw new Error(`Sorry, you cannot pay already canceled course`)
  }

  checkPayment(): Promise<{user: UserEntity; status: string}> {
    throw new Error(`Sorry, you cannot check already canceled course`)
  }

  cancelPayment(): Promise<{user: UserEntity}> {
    throw new Error(`Sorry, you cannot cancel already canceled course`)
  }
}
