import { Controller, Post, Body } from '@nestjs/common';
import { FcmService } from './notifications.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('FCM')
@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post('send')
  @ApiBody({
    schema: {
      example: {
        token: 'fcm_device_token_here',
        title: 'Заголовок',
        body: 'Текст уведомления',
        data: {
          orderId: 'some-order-id',
        },
      },
    },
  })
  async sendNotification(
    @Body()
    payload: {
      token: string;
      title: string;
      body: string;
      data?: Record<string, any>;
    },
  ) {
    return this.fcmService.sendNotification(payload);
  }
}
