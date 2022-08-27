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
}
