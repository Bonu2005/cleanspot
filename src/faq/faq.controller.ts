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
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { RolesGuard } from 'src/authguard/roles.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('FAQ')
@ApiBearerAuth('access-token')
@Controller('faq')
@UseGuards(AuthGuard, RolesGuard)
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Создать вопрос/ответ (только для админа)' })
  create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить весь список вопросов' })
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить конкретный вопрос по ID' })
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Обновить вопрос/ответ (только для админа)' })
  update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить вопрос (только для админа)' })
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
