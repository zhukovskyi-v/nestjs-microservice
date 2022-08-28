import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from '@microservice/interfaces';
import { AccountRegister } from '@microservice/contracts';
import { UserRepository } from '../user/repositories';
import { LoginDto, RegisterDto, UpdateAuthDto } from './dto';
import { UserEntity } from '../user/entities';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {
  }

  async create({ email, password, displayName, role }: RegisterDto): Promise<AccountRegister.Response> {
    const oldUser = await this.userRepository.findUserByEmail(email);

    if (oldUser) {
      throw new Error('User already exists');
    }
    const newUserEntity = await new UserEntity({
      email,
      password,
      displayName,
      role: role || UserRoles.STUDENT
    }).setPassword(password);

    const res = await this.userRepository.createUser(newUserEntity);

    return { displayName: res.displayName, email: res.email, role: res.role, _id: res._id };
  }

  async validateUser(email: string, password: string): Promise<{ id: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const userPassword = await new UserEntity(user).validatePassword(password);
    if (!userPassword) {
      throw new Error('Password not valid');
    }
    return { id: user._id };
  }

  async login({ password, email }: LoginDto) {
    const { id } = await this.validateUser(email, password);
    const accessToken = await this.jwtService.signAsync({
      id
    }, { expiresIn: 3600 });
    return { accessToken };
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
