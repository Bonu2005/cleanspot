import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/authguard/authguard.guard';

@ApiTags('Address')
@ApiBearerAuth()
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создать адрес пользователя' })
  create(@Req() req: any, @Body() dto: CreateAddressDto) {
    return this.addressService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все адреса' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить адрес по ID' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить адрес' })
  update(@Param('id') id: string, @Body() dto: UpdateAddressDto) {
    return this.addressService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить адрес' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
