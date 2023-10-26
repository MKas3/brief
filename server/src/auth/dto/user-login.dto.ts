import { LoginDto } from './login.dto';
import { ValidateNested } from 'class-validator';

export class UserLoginDto {
  @ValidateNested()
  user: LoginDto;
}
