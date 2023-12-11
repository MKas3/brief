import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class BriefImageAuthorGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (!req.user.id && !req.linkData.id) return false;
    let userId = +req.user.id;
    if (!req.user.id)
      userId = (await this.userService.findByBrief(+req.linkData.id)).id;
    return await this.userService.hasBriefImage(userId, +req.params.id);
  }
}
