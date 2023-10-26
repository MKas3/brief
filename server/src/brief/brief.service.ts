import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BriefService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createBriefDto: CreateBriefDto) {
    const brief = await this.prisma.brief.create({
      data: {
        userId,
        ...createBriefDto,
      },
    });
    return brief;
  }

  findAll(
    skip?: number,
    take?: number,
    where?: Prisma.BriefWhereInput,
    cursor?: Prisma.BriefWhereUniqueInput,
    orderBy?: Prisma.BriefOrderByWithRelationInput,
  ) {
    return this.prisma.brief.findMany({
      skip,
      take,
      where,
      cursor,
      orderBy,
      include: {
        images: true,
      },
    });
  }

  async findOne(where: Prisma.BriefWhereUniqueInput) {
    const candidate = await this.prisma.brief.findUnique({
      where,
      include: {
        images: true,
      },
    });
    if (!candidate) throw new BadRequestException();
    return candidate;
  }

  update(where: Prisma.BriefWhereUniqueInput, data: UpdateBriefDto) {
    return this.prisma.brief.update({
      data,
      where,
    });
  }

  remove(where: Prisma.BriefWhereUniqueInput) {
    return this.prisma.brief.delete({
      where,
    });
  }

  async hasBriefImage(userId: number, imageId: number) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        id: userId,
        briefs: {
          some: {
            images: {
              some: {
                id: imageId,
              },
            },
          },
        },
      },
    });
    return candidate !== null;
  }
}
