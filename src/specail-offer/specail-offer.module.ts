import { Module } from '@nestjs/common';
import { SpecialOfferService } from './specail-offer.service';
import { SpecialOfferController } from './specail-offer.controller';

@Module({
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService],
  exports:[SpecialOfferService]
})
export class SpecailOfferModule {}
