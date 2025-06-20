import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: CreateRequestDto) {
    try {
      return await this.prisma.request.create({
        data: {
          ...dto,
          userId,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.request.findMany({
        include: {
          user: {
            select: { id: true, username: true },
          },
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findOne(id: string) {
    try {
      let findU = await this.prisma.request.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("request with this id not found")
      }
      const request = await this.prisma.request.findUnique({
        where: { id },
        include: { user: true },
      });

      if (!request) {
        throw new NotFoundException('Заявка не найдена');
      }

      return request;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: string, dto: UpdateRequestDto) {
    try {
      let findU = await this.prisma.request.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("request with this id not found")
      }
      return await this.prisma.request.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: string) {
    try {
      let findU = await this.prisma.request.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("request with this id not found")
      }
      return await this.prisma.request.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): never {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Запись не найдена или уже удалена');
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Такая запись уже существует');
      }
    }

    console.error('[PRISMA ERROR]', error);
    throw new InternalServerErrorException('Внутренняя ошибка сервера');
  }
}
