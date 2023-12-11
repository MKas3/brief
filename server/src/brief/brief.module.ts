import { Module } from '@nestjs/common';
import { BriefService } from './brief.service';
import { BriefController } from './brief.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { BriefImageService } from '../brief-image/brief-image.service';
import { CryptoService } from '../crypto/crypto.service';

@Module({
  imports: [UserModule],
  controllers: [BriefController],
  providers: [BriefService, PrismaService, BriefImageService, CryptoService],
  exports: [BriefService],
})
export class BriefModule {}
