import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserExistenceGuard } from '../guards/user-existence.guard';
import { CreateUserGoogleDto } from '../user/dto/create-user-google.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  auth(@Req() req: UserLoginDto) {
    return this.authService.login(req.user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Req() req: UserLoginDto) {
    return this.authService.login(req.user);
  }

  @Post('login/google')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  loginByGoogle(@Body() loginDto: CreateUserGoogleDto) {
    return this.authService.loginByGoogle(loginDto);
  }
}
