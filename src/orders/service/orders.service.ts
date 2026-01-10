import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-orders.dto';
import { Order, OrderItem, OrderStatus } from '../entities/oerders.entity';
import { PlatesService } from '../../plates/service/plates.service';
import { UserRole } from '../../users/entities/users.entity';

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

    async findOne(id: string, user: any) {
        const order = await this.orderRepository.findOne({
            where: { id: id }
        });

        if (!order) {
            throw new NotFoundException(`Pedido #${id} não encontrado`);
        }

        if (user.role !== UserRole.ADMIN && order.userId !== user.userId) {
            throw new ForbiddenException('Você não tem permissão para acessar este pedido');
        }

        return order;
    }
    async findMyOrders(userId: string) {
        return this.orderRepository.find({
            where: { userId: userId }
        })
    }

    async updateStatus(id: string, status: OrderStatus) {

        const adminUser = { role: UserRole.ADMIN, userId: 'admin-system' };
        const order = await this.findOne(id, adminUser);

        order.status = status;
        return this.orderRepository.save(order);
    }
}