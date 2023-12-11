import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BriefService } from '../brief/brief.service';

@Injectable()
export class NotCompletedBriefGuard implements CanActivate {
  constructor(
    @Inject(BriefService) private readonly briefService: BriefService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (!req.params.id && !req.linkData.id) return false;
    let briefId = +req.linkData.id;
    if (!req.linkData.id) {
      if (!req.params.id) return false;
      briefId = +req.params.id;
    }
    return !(
      await this.briefService.findOne({
        id: briefId,
      })
    ).completed;
  }
}
