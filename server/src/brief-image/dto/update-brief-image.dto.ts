import { PartialType } from '@nestjs/mapped-types';
import { CreateBriefImageDto } from './create-brief-image.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateBriefImageDto extends PartialType(CreateBriefImageDto) {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsInt()
  briefId: number;
}
