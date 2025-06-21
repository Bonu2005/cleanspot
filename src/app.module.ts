import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskHistoryModule } from './task-history/task-history.module';
import { RatingModule } from './rating/rating.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { AddressModule } from './address/address.module';
import { RequestModule } from './request/request.module';
import { UserModule } from './user/user.module';
import { SpecailOfferModule } from './specail-offer/specail-offer.module';
import { PickupPointModule } from './pickup-point/pickup-point.module';
import { ReportModule } from './report/report.module';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { FcmModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, MailModule, PrismaModule, TaskHistoryModule, RatingModule, MonitoringModule, AddressModule ,RequestModule, UserModule, SpecailOfferModule, PickupPointModule, ReportModule, UploadModule, OrderModule, FcmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
