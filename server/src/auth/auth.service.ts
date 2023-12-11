import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { CreateUserGoogleDto } from '../user/dto/create-user-google.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userData: Prisma.UserWhereUniqueInput) {
    const { email, password } = userData;
    const user = await this.userService.findOne({
      email,
    });
    if (user && (await argon2.verify(user.password, password as string))) {
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(loginDto: LoginDto) {
    const { id, email, role, name, isGoogle = false } = loginDto;
    const candidate = await this.userService.findOne({
      id,
      email,
      role,
      name,
    });

    if (!candidate) throw new BadRequestException();

    return {
      id,
      email,
      name,
      token: await this.jwtService.signAsync({
        id,
        email,
        role,
        name,
        isGoogle,
      }),
      role,
      avatar: candidate.avatar,
    };
  }

  async loginByGoogle(userData: CreateUserGoogleDto) {
    const data = await this.userService.getGoogleUser(userData);
    if (!data) throw new UnauthorizedException();
    const candidate = await this.userService.findOne({
      email: data.email,
    });
    if (!candidate) throw new UnauthorizedException();
    return {
      id: candidate.id,
      email: candidate.email,
      name: candidate.name,
      token: await this.jwtService.signAsync({
        id: candidate.id,
        email: candidate.email,
        role: candidate.role,
        name: candidate.name,
        isGoogle: candidate.isGoogle,
      }),
      role: candidate.role,
    };
  }
}
