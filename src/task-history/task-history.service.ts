import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskHistoryDto } from './dto/create-task-history.dto';
import { UpdateTaskHistoryDto } from './dto/update-task-history.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskHistoryService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: CreateTaskHistoryDto) {
    try {
      let { requestId } = dto
      let findU = await this.prisma.request.findFirst({ where: { id: requestId } })
      if (!findU) {
        return new NotFoundException("request with this id not found")
      }
      return await this.prisma.taskHistory.create({
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
      return await this.prisma.taskHistory.findMany({
        include: { user: true, request: true },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.prisma.taskHistory.findUnique({
        where: { id },
        include: { user: true, request: true },
      });
      if (!task) throw new NotFoundException('История задачи не найдена');
      return task;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: string, dto: UpdateTaskHistoryDto) {
    try {
      return await this.prisma.taskHistory.update({
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
      return await this.prisma.taskHistory.delete({
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
    throw new InternalServerErrorException('Произошла ошибка при работе с базой данных');
  }
}
