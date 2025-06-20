import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateFaqDto) {
    try {
      return await this.prisma.faq.create({ data: dto });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.faq.findMany();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findOne(id: string) {
    try {
      let findU = await this.prisma.faq.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("faq with this id not found")
      }
      const faq = await this.prisma.faq.findUnique({ where: { id } });
      if (!faq) throw new NotFoundException('Вопрос не найден');
      return faq;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: string, dto: UpdateFaqDto) {
    try {
      let findU = await this.prisma.faq.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("faq with this id not found")
      }
      return await this.prisma.faq.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: string) {
    try {
      let findU = await this.prisma.faq.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("faq with this id not found")
      }
      return await this.prisma.faq.delete({ where: { id } });
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
        throw new BadRequestException('Такая запись уже существует');
      }
    }

    console.error('[PRISMA ERROR]', error);
    throw new InternalServerErrorException('Произошла ошибка на сервере');
  }
}
