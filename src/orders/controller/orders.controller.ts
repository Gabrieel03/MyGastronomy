import { Controller, Get, Post, Body, Param, UseGuards, Request, HttpCode, HttpStatus, Patch, Req } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { CreateOrderDto } from '../dto/create-orders.dto';
import { UpdateOrderStatusDto } from '../dto/update-orders.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorators';
import { UserRole } from '../../users/entities/users.entity';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo pedido' })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lista todos os pedidos' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Lista todos os pedidos do usuário logado' })
  findMyOrders(@Req()req){
    return this.ordersService.findMyOrders(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um pedido pelo ID (ex: 001)' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.ordersService.findOne(id, req.user);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Atualiza o status do pedido' })
  updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
      return this.ordersService.updateStatus(id, updateOrderStatusDto.status);
  }
}