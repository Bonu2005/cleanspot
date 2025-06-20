import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { RolesGuard } from 'src/authguard/roles.guard';
import { Roles } from 'src/authguard/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Rating')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Поставить оценку пользователю (только клиент)' })
  create(@Req() req: any, @Body() dto: CreateRatingDto) {
    return this.ratingService.create(req.user.id, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Получить все рейтинги (только админ)' })
  findAll() {
    return this.ratingService.findAll();
  }

  @Get('user/:id')
  @Roles(Role.ADMIN, Role.DRIVER, Role.CLIENT)
  @ApiOperation({ summary: 'Получить оценки, поставленные пользователю' })
  findByUser(@Param('id') id: string) {
    return this.ratingService.findByUser(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Удалить оценку (только админ)' })
  remove(@Param('id') id: string) {
    return this.ratingService.remove(id);
  }
}
