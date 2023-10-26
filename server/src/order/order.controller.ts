import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserExistenceGuard } from '../guards/user-existence.guard';
import { RoleGuard } from '../guards/role.guard';
import { $Enums } from '@prisma/client';
import { OrderAuthorGuard } from '../guards/order-author.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard)
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(+req.user.id, createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, new RoleGuard($Enums.Role.ADMIN))
  findOne(@Param('id') id: string) {
    return this.orderService.findOne({ id: +id });
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, UserExistenceGuard, OrderAuthorGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update({ id: +id }, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserExistenceGuard, OrderAuthorGuard)
  remove(@Param('id') id: string) {
    return this.orderService.remove({ id: +id });
  }
}
