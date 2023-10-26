import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateBriefImageDto implements Prisma.BriefImageCreateInput {
  @IsString()
  path: string;
}
