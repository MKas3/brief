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
    if (!req.user.id && !req.linkData.id) return false;
    let userId = +req.user.id;
    const briefId = +(req.params.id ?? req.linkData.id);
    if (!req.user.id)
      userId = (await this.userService.findByBrief(+req.linkData.id)).id;
    return await this.userService.hasBrief(userId, briefId);
  }
}
