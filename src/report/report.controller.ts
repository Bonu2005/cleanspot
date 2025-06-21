import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { RolesGuard } from 'src/authguard/roles.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Reports')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Создать новый отчёт (только клиент)' })
  create(@Req() req: any, @Body() dto: CreateReportDto) {
    return this.reportService.create(req.user.id, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить все отчёты (только админ)' })
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить отчёт по ID (только админ)' })
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить отчёт (только админ)' })
  update(@Param('id') id: string, @Body() dto: UpdateReportDto) {
    return this.reportService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить отчёт (только админ)' })
  remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }
}
