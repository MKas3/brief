import { IsString } from 'class-validator';

export class CreateUserGoogleDto {
  @IsString()
  token: string;
}
