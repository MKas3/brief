import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { BriefService } from '../brief/brief.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly briefService: BriefService,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    if (!(await this.userService.hasBrief(userId, createOrderDto.briefId)))
      throw new BadRequestException();

    return this.prisma.order.create({
      data: {
        userId,
        ...createOrderDto,
      },
    });
  }

  findAll(
    skip?: number,
    take?: number,
    cursor?: Prisma.OrderWhereUniqueInput,
    where?: Prisma.OrderWhereInput,
    orderBy?: Prisma.OrderOrderByWithRelationInput,
  ) {
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.OrderWhereUniqueInput) {
    const candidate = await this.prisma.order.findUnique({
      where,
    });
    if (!candidate) throw new BadRequestException();
    return candidate;
  }

  update(where: Prisma.OrderWhereUniqueInput, data: UpdateOrderDto) {
    return this.prisma.order.update({
      data,
      where,
    });
  }

  remove(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.delete({
      where,
    });
  }
}
