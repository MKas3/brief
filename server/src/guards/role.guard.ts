import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: $Enums.Role) {}

  canActivate(context: ExecutionContext) {
    const user = context.switchToHttp().getRequest().user;
    if (!user) return false;
    return user.role === this.role;
  }
}
