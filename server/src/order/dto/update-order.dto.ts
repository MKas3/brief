import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['briefId']),
) {
  @IsOptional()
  @IsEnum($Enums.Progress)
  progress?: $Enums.Progress;
}
