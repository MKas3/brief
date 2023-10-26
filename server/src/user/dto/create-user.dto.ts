import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  name: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/)
  @Length(6, 40)
  password: string;
}
