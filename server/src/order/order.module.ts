import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BriefModule } from '../brief/brief.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [BriefModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
