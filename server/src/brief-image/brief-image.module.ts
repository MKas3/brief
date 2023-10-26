import { Module } from '@nestjs/common';
import { BriefImageService } from './brief-image.service';
import { BriefImageController } from './brief-image.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BriefModule } from '../brief/brief.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [BriefModule, UserModule],
  controllers: [BriefImageController],
  providers: [BriefImageService, PrismaService],
})
export class BriefImageModule {}
