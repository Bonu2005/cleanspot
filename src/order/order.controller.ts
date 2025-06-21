import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CancelOrderDto,
  CreateOrderDto,
  ReportLocationDto,
} from './dto/create-order';
import { AuthGuard } from 'src/authguard/authguard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@ApiBearerAuth('access-token') 
@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() dto: CreateOrderDto, @Req() req) {
    return this.orderService.createOrder(dto, req.user.id);
  }

  @Post('cancel')
  cancel(@Body() dto: CancelOrderDto, @Req() req) {
    return this.orderService.cancelOrder(dto.orderId, dto.reason, req.user.id);
  }

  @Get('get/:id')
  get(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Get()
  getOrders(@Query('is_active') isActive: string, @Req() req) {
    const asDriver = req.user.role === 'DRIVER';
    return this.orderService.getOrders(req.user.id, isActive === 'true', asDriver);
  }

  @Post(':id/accept')
  accept(@Param('id') id: string, @Req() req) {
    return this.orderService.acceptOrder(id, req.user.id);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string, @Req() req) {
    return this.orderService.completeOrder(id, req.user.id);
  }

  @Post('couriers/report-location')
  report(@Body() dto: ReportLocationDto, @Req() req) {
    return this.orderService.reportLocation(req.user.id, dto);
  }

  @Get('couriers/all')
  allCouriers() {
    return this.orderService.getAllCouriersLocation();
  }
}
