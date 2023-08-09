import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { RandomHexService } from './randomHex.service';
import { EmailService } from './email.service';

@Module({
  providers: [EncryptionService, RandomHexService, EmailService],
  exports: [EncryptionService, RandomHexService, EmailService],
})
export class CommonModule {}
