import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class UserAuthorGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) return false;
    return this.userService.isUsersSame(user.id, +req.params.id);
  }
}
