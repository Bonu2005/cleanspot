import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async create(id, dto: CreateReportDto) {
    try {
      return await this.prisma.report.create({ data: dto });
    } catch (error) {
      throw new BadRequestException('Ошибка создания отчета');
    }
  }

  async findAll() {
    return this.prisma.report.findMany();
  }

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Отчет не найден');
    return report;
  }

  async update(id: string, dto: UpdateReportDto) {
    try {
      return await this.prisma.report.update({ where: { id }, data: dto });
    } catch (error) {
      throw new BadRequestException('Ошибка обновления отчета');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.report.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка удаления отчета');
    }
  }
}
