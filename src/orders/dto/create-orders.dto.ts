import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';

class OrderItemDto {
    
    @ApiProperty({ example: '001', description: 'ID do prato' })
    @IsString()
    @IsNotEmpty()
    plateId: string;

    @ApiProperty({ example: 2, description: 'Quantidade desejada' })
    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({ type: [OrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}