import {UserRoles} from '@microservice/interfaces'

export namespace AccountRegister {
  export const topic = 'account.register.command'

  export class Request {
    email: string
    password: string
    displayName: string
    role?: UserRoles
  }

  export class Response {
    displayName: string
    email: string
    role: UserRoles
    _id: string
  }
}
