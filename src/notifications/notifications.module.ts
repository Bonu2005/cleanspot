import { Module } from '@nestjs/common';
import { FcmService } from './notifications.service'; // если файл называется notifications.service.ts

@Module({
  providers: [FcmService],
  exports: [FcmService],
})
export class FcmModule {}
