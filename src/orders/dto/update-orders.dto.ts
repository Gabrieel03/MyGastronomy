import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../entities/oerders.entity'

export class UpdateOrderStatusDto {
  @ApiProperty({ 
    enum: OrderStatus, 
    description: 'Novo status do pedido', 
    example: OrderStatus.DELIVERED 
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}