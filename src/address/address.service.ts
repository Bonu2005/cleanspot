import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: CreateAddressDto) {
    try {
      let findU = await this.prisma.user.findFirst({ where: { id: userId } })
      if (!findU) {
        return new NotFoundException("User with this id not found")
      }
      return this.prisma.address.create({
        data: {
          ...dto,
          ecoRating: dto.ecoRating ?? 0,
          userId,
        },
      });

    } catch (err) {
      this.handleError(err);
    }
  }

  async findAll() {
    try {
      return await this.prisma.address.findMany({
        include: {
          user: {
            select: { id: true, username: true },
          },
        },
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  async findOne(id: string) {
    try {

      const addr = await this.prisma.address.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!addr) throw new NotFoundException('Адрес не найден');
      return addr;
    } catch (err) {
      this.handleError(err);
    }
  }

  async update(id: string, dto: UpdateAddressDto) {
    try {
      let findU = await this.prisma.address.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("Address with this id not found")
      }
      return await this.prisma.address.update({
        where: { id },
        data: dto,
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  async remove(id: string) {
    try {
      let findU = await this.prisma.address.findFirst({ where: { id } })
      if (!findU) {
        return new NotFoundException("Address with this id not found")
      }
      return await this.prisma.address.delete({ where: { id } });
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(error: any): never {
    if (error instanceof PrismaClientKnownRequestError) {
      // Например, ошибка уникальности или невалидного ID
      if (error.code === 'P2025') {
        throw new NotFoundException('Элемент не найден или уже удалён');
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Такие данные уже существуют');
      }
    }


    console.error('[PRISMA ERROR]', error);

    throw new InternalServerErrorException('Произошла внутренняя ошибка сервера');
  }
}
