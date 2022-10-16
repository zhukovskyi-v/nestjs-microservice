export enum UserRoles {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface IUser {
  _id?: string
  displayName: string
  email: string
  password: string
  role: UserRoles
  courses?: IUserCourses[]
}

export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Cancelled = 'Cancelled',
}

export interface IUserCourses {
  _id?: string
  courseId: string
  purchaseState: PurchaseState
}
