import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class BriefAuthorGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !req.params.id) return false;
    return await this.userService.hasBrief(user.id, +req.params.id);
  }
}
