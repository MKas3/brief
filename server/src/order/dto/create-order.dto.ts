import { $Enums, Prisma } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto implements Prisma.OrderWhereInput {
  @IsEnum($Enums.Price)
  price: $Enums.Price;

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsNumber()
  briefId: number;
}
