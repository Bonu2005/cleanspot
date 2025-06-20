import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, RequestStatus, RequestType } from '../../generated/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MonitoringService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    try {
      const totalUsers = await this.prisma.user.count();
      const drivers = await this.prisma.user.count({ where: { role: Role.DRIVER } });
      const clients = await this.prisma.user.count({ where: { role: Role.CLIENT } });

      const openRequests = await this.prisma.request.count({ where: { status: RequestStatus.OPEN } });
      const doneRequests = await this.prisma.request.count({ where: { status: RequestStatus.DONE } });
      const totalRequests = await this.prisma.request.count();

      const individualRequests = await this.prisma.request.count({
        where: { type: RequestType.SPECIAL },
      });

      const doneGeneralTasks = await this.prisma.request.count({
        where: {
          type: RequestType.STANDARD,
          status: RequestStatus.DONE,
        },
      });

      const totalRatings = await this.prisma.rating.findMany();
      const avgRating = totalRatings.length
        ? totalRatings.reduce((sum, r) => sum + r.score, 0) / totalRatings.length
        : 0;

      return {
        totalUsers,
        drivers,
        clients,
        totalRequests,
        openRequests,
        doneRequests,
        avgRating: avgRating.toFixed(2),
        individualRequests,
        doneGeneralTasks,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): never {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[PRISMA ERROR]', error.message);
    } else {
      console.error('[UNKNOWN ERROR]', error);
    }

    throw new InternalServerErrorException('Не удалось получить статистику. Попробуйте позже.');
  }
}
