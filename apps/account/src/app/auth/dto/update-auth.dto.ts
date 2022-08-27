import {RegisterDto} from './register.dto'
import {PartialType} from '@nestjs/mapped-types'

export class UpdateAuthDto extends PartialType(RegisterDto) {}
