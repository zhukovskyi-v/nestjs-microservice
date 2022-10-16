import {
  AccountChangedCourse,
  AccountChangeProfile,
} from '@microservice/contracts'
import {
  IDomainEvent,
  IUser,
  IUserCourses,
  PurchaseState,
  UserRoles,
} from '@microservice/interfaces'
import {compare, genSalt, hash} from 'bcryptjs'

export class UserEntity implements IUser {
  displayName: string
  email: string
  password: string
  role: UserRoles
  _id?: string
  courses?: IUserCourses[]
  events: IDomainEvent[]

  constructor(user: IUser) {
    this.displayName = user.displayName
    this.email = user.email
    this.role = user.role
    this._id = user._id
    this.password = user.password
    this.courses = user.courses
  }

  public async setPassword(password: string): Promise<this> {
    const salt = await genSalt(10)
    this.password = await hash(password, salt)
    return this
  }

  public validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }

  public changeProfile({
    email,
    displayName,
  }: AccountChangeProfile.Request['user']) {
    if (email) {
      this.email = email
    }
    if (displayName) {
      this.displayName = displayName
    }
    return this
  }

  public getUserPublicProfile() {
    return {
      email: this.email,
      displayName: this.displayName,
      role: this.role,
    }
  }

  public addCourse(courseId: string) {
    const existedCourse = this.courses.find((c) => c._id === courseId)
    if (existedCourse) {
      throw new Error(`Course ${courseId} already exists`)
    }
    this.courses.push({courseId, purchaseState: PurchaseState.Started})
  }

  public deleteCourse(courseId: string) {
    this.courses = this.courses.filter((c) => c._id !== courseId)
  }

  public updateCourseStatus(courseId: string, status: PurchaseState) {
    const existedCourse = this.courses.find((c) => c._id === courseId)

    if (!existedCourse) {
      this.addCourse(courseId)
      return this
    }

    if (status === PurchaseState.Cancelled) {
      this.deleteCourse(courseId)
      return this
    }

    this.courses = this.courses.map((c) => {
      if (c._id === courseId) {
        return {...c, status}
      }
      return c
    })
    this.events.push({
      topic: AccountChangedCourse.topic,
      data: {
        courseId,
        userId: this._id,
        status,
      },
    })
    return this
  }
}
