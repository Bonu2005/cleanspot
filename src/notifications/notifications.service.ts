import { Injectable } from '@nestjs/common';

@Injectable()
export class FcmService {
  async sendNotification({
    token,
    title,
    body,
    data,
  }: {
    token: string;
    title: string;
    body: string;
    data?: Record<string, any>;
  }) {
    const admin = await import('firebase-admin');
    await admin.messaging().send({
      token,
      notification: { title, body },
      data: Object.fromEntries(
        Object.entries(data || {}).map(([k, v]) => [k, String(v)])
      ),
    });
  }
}
