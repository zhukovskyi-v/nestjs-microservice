import {UserEntity} from '../entities'
import {BuyCourseSageState} from './buy-course.state'
import {
  BuyCourseSagaStateStarted,
  BuyCourseSageStateCancel,
  BuyCourseSageStateFinished,
  BuyCourseSageStateProcess,
} from './buy-course.steps'
import {PurchaseState} from '@microservice/interfaces'
import {RMQService} from 'nestjs-rmq'

export class BuyCourseSaga {
  private state: BuyCourseSageState

  constructor(
    public user: UserEntity,
    public courseId: string,
    public rmqService: RMQService,
  ) {}

  getState(): BuyCourseSageState {
    return this.state
  }

  setState(state: PurchaseState, courseId: string): void {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSagaStateStarted()
        break
      case PurchaseState.WaitingForPayment:
        this.state = new BuyCourseSageStateProcess()
        break
      case PurchaseState.Purchased:
        this.state = new BuyCourseSageStateFinished()
        break
      case PurchaseState.Cancelled:
        this.state = new BuyCourseSageStateCancel()
        break
    }
    this.state.setContext(this)
    this.user.updateCourseStatus(courseId, state)
  }
}
