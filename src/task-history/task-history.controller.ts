import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TaskHistoryService } from './task-history.service';
import { CreateTaskHistoryDto } from './dto/create-task-history.dto';
import { UpdateTaskHistoryDto } from './dto/update-task-history.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/authguard/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('TaskHistory')
@ApiBearerAuth()
@Controller('task-history')
export class TaskHistoryController {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}

  @Post()
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Создать задачу для водителя' })
  create(@Req() req: any, @Body() dto: CreateTaskHistoryDto) {
    return this.taskHistoryService.create(req.user.id, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить все задачи' })
  findAll() {
    return this.taskHistoryService.findAll();
  }

  @Get(':id')
  @Roles(Role.DRIVER, Role.ADMIN)
  @ApiOperation({ summary: 'Получить задачу по ID' })
  findOne(@Param('id') id: string) {
    return this.taskHistoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Обновить задачу' })
  update(@Param('id') id: string, @Body() dto: UpdateTaskHistoryDto) {
    return this.taskHistoryService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить задачу' })
  remove(@Param('id') id: string) {
    return this.taskHistoryService.remove(id);
  }
}
