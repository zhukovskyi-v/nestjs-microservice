import {IUser, UserRoles} from '@microservice/interfaces'
import {compare, genSalt, hash} from 'bcryptjs'

export class UserEntity implements IUser {
  displayName: string
  email: string
  password: string
  role: UserRoles
  _id?: string

  constructor(user: IUser) {
    this.displayName = user.displayName
    this.email = user.email
    this.role = user.role
    this._id = user._id
    this.password = user.password
  }

  public async setPassword(password: string): Promise<this> {
    const salt = await genSalt(10)
    this.password = await hash(password, salt)
    return this
  }

  public validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}
