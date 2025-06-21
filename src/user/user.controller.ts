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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('User')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('sessions')
  getSession(@Req() req: Request) {
    return this.userService.getSession(req);
  }

  @Delete('session/:id')
  delSession(@Param('id') id: string, @Req() req: Request) {
    return this.userService.delSession(id, req);
  }

  // @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  // @ApiQuery({ name: 'sortBy', required: false, type: String })
  // @ApiQuery({ name: 'limit', required: false, type: Number })
  // @ApiQuery({ name: 'page', required: false, type: Number })
  // @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'INACTIVE'] })
  // @ApiQuery({ name: 'role', required: false, enum: ['USER', 'SUPERADMIN'] })
  // @ApiQuery({ name: 'region_id', required: false, type: Number })
  // @ApiQuery({ name: 'phone', required: false, type: String })
  // @ApiQuery({ name: 'email', required: false, type: String })
  // @ApiQuery({ name: 'last_name', required: false, type: String })
  // @ApiQuery({ name: 'first_name', required: false, type: String })
  // @Get()
  // findAll(@Query() query: any) {
  //   return this.userService.findAll(query);
  // }

  // @ApiOperation({ summary: 'Получить пользователя по ID' })
  // @ApiResponse({ status: 200, description: 'Пользователь найден' })
  // @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  // @ApiParam({ name: 'id', description: 'ID пользователя', type: String })
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }


  @ApiOperation({ summary: 'Получить данные текущего пользователя (me)' })
  @ApiResponse({ status: 200, description: 'Информация о текущем пользователе' })
  @Get('me')
  async getMe(@Req() req) {
    console.log(req.user.id);
    
    return this.userService.getMe(req.user.id);
  }

}
