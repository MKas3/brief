import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BriefModule } from './brief/brief.module';
import { BriefImageModule } from './brief-image/brief-image.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BriefModule,
    BriefImageModule,
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
