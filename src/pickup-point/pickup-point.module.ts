import { Module } from '@nestjs/common';
import { PickupPointService } from './pickup-point.service';
import { PickupPointController } from './pickup-point.controller';

@Module({
  controllers: [PickupPointController],
  providers: [PickupPointService],
  exports:[PickupPointService]
})
export class PickupPointModule {}
