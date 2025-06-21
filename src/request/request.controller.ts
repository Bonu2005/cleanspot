import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { RolesGuard } from 'src/authguard/roles.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Requests')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Создать новое обращение (только клиент)' })
  create(@Req() req: any, @Body() dto: CreateRequestDto) {
    return this.requestService.create(req.user.id, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить все обращения (только админ)' })
  findAll() {
    return this.requestService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DRIVER)
  @ApiOperation({ summary: 'Получить обращение по ID (админ или водитель)' })
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить обращение (только админ)' })
  update(@Param('id') id: string, @Body() dto: UpdateRequestDto) {
    return this.requestService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить обращение (только админ)' })
  remove(@Param('id') id: string) {
    return this.requestService.remove(id);
  }
}
