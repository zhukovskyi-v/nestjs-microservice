import {UserRoles} from '@microservice/interfaces'

export class RegisterDto {
  email: string
  password: string
  displayName: string
  role?: UserRoles
}
