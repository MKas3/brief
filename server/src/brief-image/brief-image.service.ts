import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBriefImageDto } from './dto/create-brief-image.dto';
import { UpdateBriefImageDto } from './dto/update-brief-image.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class BriefImageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(briefId: number, createBriefImageDto: CreateBriefImageDto) {
    const brief = await this.prisma.brief.findUnique({
      where: {
        id: briefId,
      },
    });

    if (!brief) throw new BadRequestException();

    return this.prisma.briefImage.create({
      data: {
        briefId,
        ...createBriefImageDto,
      },
    });
  }

  findAll(
    skip?: number,
    take?: number,
    cursor?: Prisma.BriefImageWhereUniqueInput,
    where?: Prisma.BriefImageWhereInput,
    orderBy?: Prisma.BriefImageOrderByWithRelationInput,
  ) {
    return this.prisma.briefImage.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findAllByWhere(where?: Prisma.BriefImageWhereInput) {
    return this.prisma.briefImage.findMany({
      where,
    });
  }

  async findAllByBrief(where: Prisma.BriefWhereUniqueInput) {
    const brief = await this.prisma.brief.findUnique({
      where,
    });

    if (!brief) throw new BadRequestException();

    return this.prisma.briefImage.findMany({
      where: {
        briefId: brief.id,
      },
    });
  }

  async findOne(where: Prisma.BriefImageWhereUniqueInput) {
    const candidate = await this.prisma.briefImage.findUnique({
      where,
    });
    if (!candidate) throw new BadRequestException();
    return candidate;
  }

  update(where: Prisma.BriefImageWhereUniqueInput, data: UpdateBriefImageDto) {
    return this.prisma.briefImage.update({
      data,
      where,
    });
  }

  remove(where: Prisma.BriefImageWhereUniqueInput) {
    return this.prisma.briefImage.delete({
      where,
    });
  }
}
