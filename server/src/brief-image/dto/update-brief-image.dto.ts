import { PartialType } from '@nestjs/mapped-types';
import { CreateBriefImageDto } from './create-brief-image.dto';

export class UpdateBriefImageDto extends PartialType(CreateBriefImageDto) {}
