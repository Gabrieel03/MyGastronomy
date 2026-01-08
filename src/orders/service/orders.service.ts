import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-orders.dto';
import { Order, OrderItem, OrderStatus } from '../entities/oerders.entity';
import { PlatesService } from '../../plates/service/plates.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private platesService: PlatesService,
    ) { }

    async create(createOrderDto: CreateOrderDto, user: any): Promise<Order> {
        const orderItems: OrderItem[] = [];
        let total = 0;

        for (const itemDto of createOrderDto.items) {

            const plate = await this.platesService.findOne(itemDto.plateId);
            const orderItem: OrderItem = {
                plateId: plate.id,
                name: plate.name,
                quantity: itemDto.quantity,
                price: plate.price,
            };

            orderItems.push(orderItem);
            total += plate.price * itemDto.quantity;
        }

        const lastOrder = await this.orderRepository.findOne({
            order: { id: 'DESC' } as any,
        });
        const lastNumber = lastOrder ? parseInt(lastOrder.id, 10) : 0;
        const nextId = (lastNumber + 1).toString().padStart(3, '0');

        const newOrder = this.orderRepository.create({
            id: nextId,
            userId: user.userId,
            clientName: user.name || user.email,
            items: orderItems,
            total: total,
            status: OrderStatus.PENDING,
        });

        return this.orderRepository.save(newOrder);
    }

    findAll() {
        return this.orderRepository.find();
    }

    async findOne(id: string) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Pedido #${id} não encontrado`);
        }
        return order;
    }

    async updateStatus(id: string, status: OrderStatus) {
        const order = await this.findOne(id);
        order.status = status;
        return this.orderRepository.save(order);
    }
}