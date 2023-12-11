import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly algorithm: string;
  private readonly initVector: crypto.BinaryLike;
  private readonly key: crypto.CipherKey;

  constructor(private readonly configService: ConfigService) {
    this.algorithm = 'aes-256-cbc';
    this.initVector = new Uint8Array(JSON.parse(configService.get('LINK_IV')));

    const secretKey = configService.get('LINK_SECRET');
    const salt = configService.get('LINK_SALT');
    this.key = crypto.scryptSync(secretKey, salt, 32);
  }

  encryptLink(data: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.key,
      this.initVector,
    );
    let encrypted = cipher.update(data, 'utf8', 'base64url');
    encrypted += cipher.final('base64url');
    return encrypted;
  }

  decryptLink(encrypted: string) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      this.initVector,
    );
    let decrypted = decipher.update(encrypted, 'base64url', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
