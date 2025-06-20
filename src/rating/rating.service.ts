import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) { }

  async create(fromUserId: string, dto: CreateRatingDto) {
    try {
      const { toUser } = dto
      let findU = await this.prisma.user.findFirst({ where: { id: toUser } })
      if (!findU) {
        return new NotFoundException("User with this id not found")
      }
      return await this.prisma.rating.create({
        data: {
          fromUser: fromUserId,
          toUser: dto.toUser,
          region: dto.region,
          score: dto.score,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.rating.findMany({
        include: {
          from: { select: { id: true, username: true } },
          to: { select: { id: true, username: true } },
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findByUser(userId: string) {
    try {
      
      let findU = await this.prisma.user.findFirst({ where: { id: userId } })
      if (!findU) {
        return new NotFoundException("User with this id not found")
      }
      return await this.prisma.rating.findMany({
        where: { toUser: userId },
        include: {
          from: true,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.rating.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException('Оценка не найдена');
      return await this.prisma.rating.delete({ where: { id } });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): never {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Запись не найдена');
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Такая оценка уже существует');
      }
    }

    console.error('[PRISMA ERROR]', error);
    throw new InternalServerErrorException('Произошла внутренняя ошибка сервера');
  }
}
