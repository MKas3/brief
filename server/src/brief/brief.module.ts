import { Module } from '@nestjs/common';
import { BriefService } from './brief.service';
import { BriefController } from './brief.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BriefController],
  providers: [BriefService, PrismaService],
  exports: [BriefService],
})
export class BriefModule {}
