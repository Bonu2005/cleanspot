import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePickupPointDto } from './dto/update-pickup-point.dto';
import { CreatePickupPointDto } from './dto/create-pickup-point.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class PickupPointService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePickupPointDto) {
    try {
      return await this.prisma.pickupPoint.create({ data: dto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Ошибка в данных PickupPoint');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return this.prisma.pickupPoint.findMany();
  }

  async findOne(id: string) {
    const point = await this.prisma.pickupPoint.findUnique({ where: { id } });
    if (!point) throw new NotFoundException('PickupPoint не найден');
    return point;
  }

  async update(id: string, dto: UpdatePickupPointDto) {
    try {
      return await this.prisma.pickupPoint.update({ where: { id }, data: dto });
    } catch (error) {
      throw new BadRequestException('Ошибка обновления PickupPoint');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.pickupPoint.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка удаления PickupPoint');
    }
  }
}
