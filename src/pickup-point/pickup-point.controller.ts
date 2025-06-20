import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PickupPointService } from './pickup-point.service';
import { CreatePickupPointDto } from './dto/create-pickup-point.dto';
import { UpdatePickupPointDto } from './dto/update-pickup-point.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { RolesGuard } from 'src/authguard/roles.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('PickupPoint')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('pickup-point')
export class PickupPointController {
  constructor(private readonly pickupPointService: PickupPointService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Создать пункт сбора (только для админа)' })
  create(@Body() dto: CreatePickupPointDto) {
    return this.pickupPointService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех пунктов сбора' })
  findAll() {
    return this.pickupPointService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пункт сбора по ID' })
  findOne(@Param('id') id: string) {
    return this.pickupPointService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить пункт сбора (только для админа)' })
  update(@Param('id') id: string, @Body() dto: UpdatePickupPointDto) {
    return this.pickupPointService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить пункт сбора (только для админа)' })
  remove(@Param('id') id: string) {
    return this.pickupPointService.remove(id);
  }
}
