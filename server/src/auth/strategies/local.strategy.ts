import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    if (password.length < 6 || password.length > 40)
      throw new UnauthorizedException();
    const user = await this.authService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
