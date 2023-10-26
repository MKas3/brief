import { PartialType } from '@nestjs/mapped-types';
import { CreateBriefDto } from './create-brief.dto';

export class UpdateBriefDto extends PartialType(CreateBriefDto) {}
