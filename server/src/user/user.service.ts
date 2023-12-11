import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
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
    return {
      email,
      id,
      token,
      name,
      role,
      avatar: user.avatar,
      isGoogle: user.isGoogle,
    };
  }

  async createByGoogle(userData: CreateUserGoogleDto) {
    const data = await this.getGoogleUser(userData);
    return await this.create({
      email: data.email,
      name: data.name,
      avatar: data.avatar,
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
    return { email: data.email, name: data.name, avatar: data.picture };
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
    }) as unknown as {
      id: number;
      email: string;
      name: string;
      avatar: string;
      role: Role;
      isGoogle: boolean;
    }[];
  }

  async findOne(where: Prisma.UserWhereInput) {
    const candidate = await this.prisma.user.findFirst({
      where,
    });
    if (!candidate) throw new BadRequestException();
    return candidate;
  }

  async findByBrief(briefId: number) {
    return (await this.findOne({
      briefs: {
        some: {
          id: briefId,
        },
      },
    })) as {
      id: number;
      email: string;
      name: string;
      avatar: string;
      role: Role;
      isGoogle: boolean;
    };
  }

  async update(where: Prisma.UserWhereUniqueInput, data: UpdateUserDto) {
    const { password, ...otherData } = data;
    const hashPassword = await argon2.hash(password);

    const updateData = await this.prisma.user.update({
      data: {
        password: hashPassword,
        ...otherData,
      },
      where,
    });

    const token = this.jwtService.sign({
      id: updateData.id,
      email: updateData.email,
      role: updateData.role,
      name: updateData.name,
    });

    return {
      email: updateData.email,
      id: updateData.id,
      token: token,
      name: updateData.name,
      role: updateData.role,
      avatar: updateData.avatar,
    };
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
