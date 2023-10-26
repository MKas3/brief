import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserGoogleDto } from './dto/create-user-google.dto';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(userData: Prisma.UserCreateInput) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (candidate) throw new BadRequestException();

    const { password, ...otherData } = userData;
    const hashPassword = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: { password: hashPassword, ...otherData },
    });

    const { id, email, name, role } = user;
    const token = this.jwtService.sign({ id, email, role, name });
    return { email, id, token, name, role };
  }

  async createByGoogle(userData: CreateUserGoogleDto) {
    const data = await this.getGoogleUser(userData);
    return await this.create({
      email: data.email,
      name: data.name,
      avatar: data.picture,
      password: 'no',
      role: 'USER',
      isGoogle: true,
    });
  }

  async getGoogleUser(googleData: CreateUserGoogleDto) {
    if (!googleData || !googleData.token) throw new UnauthorizedException();
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${googleData.token}` },
      },
    );
    return data as { email: string; name: string; picture: string };
  }

  async findAll(
    skip?: number,
    take?: number,
    cursor?: Prisma.UserWhereUniqueInput,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ) {
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async find(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const candidate = await this.prisma.user.findUnique({
      where,
    });
    if (!candidate) throw new BadRequestException();
    return candidate;
  }

  update(where: Prisma.UserWhereUniqueInput, data: UpdateUserDto) {
    return this.prisma.user.update({
      data,
      where,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }

  async hasBrief(userId: number, briefId: number) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        id: userId,
        briefs: {
          some: {
            id: briefId,
          },
        },
      },
    });
    return candidate !== null;
  }

  async hasBriefImage(userId: number, briefImageId: number) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        id: userId,
        briefs: {
          some: {
            images: {
              some: {
                id: briefImageId,
              },
            },
          },
        },
      },
    });
    return candidate !== null;
  }

  async hasOrder(userId: number, orderId: number) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        id: userId,
        orders: {
          some: {
            id: orderId,
          },
        },
      },
    });
    return candidate !== null;
  }

  async isUserExist(id: number) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return candidate !== null;
  }

  async isUsersSame(firstId: number, secondId: number) {
    return firstId === secondId;
  }
}
