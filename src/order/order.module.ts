import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FcmModule } from 'src/notifications/notifications.module';

@Module({
  imports:[FcmModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
