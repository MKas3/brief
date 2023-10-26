import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { $Enums } from '@prisma/client';

export class LoginDto {
  @IsNumber()
  @Min(0)
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsEnum($Enums.Role)
  role: $Enums.Role;

  @IsBoolean()
  isGoogle: boolean;
}
