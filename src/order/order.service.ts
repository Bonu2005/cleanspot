import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto, ReportLocationDto } from "./dto/create-order";
import { Injectable } from "@nestjs/common";
import { FcmService } from "src/notifications/notifications.service";
import { Request } from "express";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private fcmService: FcmService) {}

  async createOrder(dto: CreateOrderDto, userId: string) {
    const order = await this.prisma.order.create({
      data: {
        userId,
        locationLat: dto.location.lat,
        locationLong: dto.location.long,
        locationName: dto.location.name,
        assistantCount: dto.assistant_count,
        comment: dto.comment,
      },
    });

    const drivers = await this.prisma.user.findMany({
      where: { role: 'DRIVER', fcmToken: { not: null } },
    });

    for (const driver of drivers) {
      await this.fcmService.sendNotification({
        token: driver.fcmToken!,
        title: 'Новый заказ',
        body: 'Проверьте заказы рядом',
        data: { orderId: order.id },
      });
    }

    return order;
  }

  async cancelOrder(orderId: string, reason: string,req:Request) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { isActive: false },
    });
  }

  async acceptOrder(orderId: string, driverId: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { courierId: driverId },
    });

    const user = await this.prisma.user.findUnique({ where: { id: order.userId } });
    if (user?.fcmToken) {
      await this.fcmService.sendNotification({
        token: user.fcmToken,
        title: 'Заказ принят',
        body: 'Курьер в пути',
        data: { orderId },
      });
    }

    return order;
  }

  async completeOrder(orderId: string,req:Request) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { isActive: false, completedAt: new Date() },
    });
  }

  async getOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { courier: true },
    });

    return {
      location: {
        lat: order!.locationLat,
        long: order!.locationLong,
        name: order!.locationName,
      },
      assistant_count: order!.assistantCount,
      courier_name: order!.courier?.username,
      courier_location: {
        lat: order!.courier?.currentLat,
        long: order!.courier?.currentLong,
      },
    };
  }

  async getOrders(userId: string, isActive: boolean, asDriver: boolean) {
    return this.prisma.order.findMany({
      where: {
        isActive,
        ...(asDriver ? { courierId: userId } : { userId }),
      },
    });
  }

  async reportLocation(userId: string, dto: ReportLocationDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        currentLat: dto.lat,
        currentLong: dto.long,
      },
    });
  }

  async getAllCouriersLocation() {
    const drivers = await this.prisma.user.findMany({
      where: {
        role: 'DRIVER',
        currentLat: { not: null },
        currentLong: { not: null },
      },
    });

    return drivers.map((d) => ({
      lat: d.currentLat,
      long: d.currentLong,
    }));
  }
}
