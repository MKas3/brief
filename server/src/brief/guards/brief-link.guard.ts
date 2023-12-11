import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BriefService } from '../brief.service';

@Injectable()
export class BriefLinkGuard implements CanActivate {
  constructor(
    @Inject(BriefService) private readonly briefService: BriefService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const query = req.query;
    if (!query || !query.brief) return false;
    try {
      const result = this.briefService.checkLink(query.brief);
      req.linkData = { id: result.data };
      return result?.data !== undefined;
    } catch {
      return false;
    }
  }
}
