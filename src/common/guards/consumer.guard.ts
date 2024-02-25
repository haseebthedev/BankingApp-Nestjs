import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/common/enums';

@Injectable()
export class ConsumerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user information is stored in the request object

    if (!user || !user.type) {
      return false; // Reject request if user information or type is missing
    }
    return user.type === UserType.CONSUMER.toLowerCase();
  }
}
