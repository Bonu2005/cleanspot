import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SpecialOfferService } from './specail-offer.service';
import { CreateSpecialOfferDto, } from './dto/create-specail-offer.dto';
import { UpdateSpecialOfferDto } from './dto/update-specail-offer.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { RolesGuard } from 'src/authguard/roles.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Special Offers')
@ApiBearerAuth()
@Controller('special-offers')
@UseGuards(AuthGuard, RolesGuard)
export class SpecialOfferController {
  constructor(private service: SpecialOfferService) { }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Создать спецпредложение (только для админа)' })
  create(@Body() dto: CreateSpecialOfferDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все спецпредложения (доступно всем)' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить спецпредложение по ID (доступно всем)' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить спецпредложение (только для админа)' })
  update(@Param('id') id: string, @Body() dto: UpdateSpecialOfferDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить спецпредложение (только для админа)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}