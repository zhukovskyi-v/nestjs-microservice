import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export const UserId = createParamDecorator(
  (data, input: ExecutionContext) => input.switchToHttp().getRequest()?.user,
)
