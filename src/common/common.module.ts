import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { RandomHexService } from './randomHex.service';

@Module({
  providers: [EncryptionService, RandomHexService],
  exports: [EncryptionService, RandomHexService],
})
export class CommonModule {}
