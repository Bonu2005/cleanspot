import { Controller, Get, UseGuards } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { RolesGuard } from 'src/authguard/roles.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Monitoring')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Получить общую статистику системы (для админа)' })
  getStats() {
    return this.monitoringService.getStats();
  }
}
