import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSpecialOfferDto } from './dto/create-specail-offer.dto';
import { UpdateSpecialOfferDto } from './dto/update-specail-offer.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SpecialOfferService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSpecialOfferDto) {
    try {
      return await this.prisma.specialOffer.create({ data: dto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Ошибка в данных или внешнем ключе');
      }
      throw new InternalServerErrorException('Ошибка при создании спецпредложения');
    }
  }

  async findAll() {
    return this.prisma.specialOffer.findMany();
  }

  async findOne(id: string) {
    try {
      const offer = await this.prisma.specialOffer.findUnique({ where: { id } });
      if (!offer) throw new NotFoundException('Спецпредложение не найдено');
      return offer;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении данных');
    }
  }

  async update(id: string, dto: UpdateSpecialOfferDto) {
    try {
      return await this.prisma.specialOffer.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Ошибка обновления спецпредложения');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.specialOffer.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Невозможно удалить спецпредложение');
      }
      throw new InternalServerErrorException();
    }
  }
}
