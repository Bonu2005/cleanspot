import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async getSession(req: Request) {
    let user = req['user'];
    try {
      let session = await this.checkSession(user.id, req.ip!);
      if (!session) {
        throw new UnauthorizedException('Unauthorized');
      }

      let data = await this.prisma.session.findMany({
        where: { user_id: user.id },
      });

      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delSession(id: string, req: Request) {
    let user = req['user'];
    try {
      let session = await this.prisma.session.delete({
        where: { user_id: user.id, id },
      });
      return { data: session };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: any) {

    try {
      let data = await this.prisma.user.findMany({

      });

      if (!data.length) {
        throw new NotFoundException('No users found');
      }

      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // async findOne(id: string) {
  //   try {
  //     let data = await this.prisma.user.findUnique({
  //       where: { id },
  //     });

  //     if (!data) {
  //       throw new NotFoundException('Not found user');
  //     }

  //     return { data };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }



  async checkSession(user_id: string, ip: string) {
    try {
      let session = await this.prisma.session.findFirst({
        where: { user_id, ip },
      });
      return session;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getMe(userId: string) {
    console.log(userId);
    
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        addresses: true,
        requests: true,
        taskHistories: true,
        ratingsGiven: true,
        ratingsReceived: true,
        sessions: true,
        DriverOffer: true,
        ordersCreated: true,
        ordersTaken: true,
      },
    });
  }

}
