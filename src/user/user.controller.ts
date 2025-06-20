import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('sessions')
  getSession(@Req() req: Request) {
    return this.userService.getSession(req);
  }

  @UseGuards(AuthGuard)
  @Delete('session/:id')
  delSession(@Param('id') id: string, @Req() req: Request) {
    return this.userService.delSession(id, req);
  }

  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
  })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
  })
  @ApiQuery({
    name: 'role',
    required: false,
    type: String,
    enum: ['USER', 'SUPERADMIN'],
  })
  @ApiQuery({ name: 'region_id', required: false, type: Number })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'last_name', required: false, type: String })
  @ApiQuery({ name: 'first_name', required: false, type: String })


  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

 
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

}
