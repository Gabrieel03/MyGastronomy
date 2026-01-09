import { Column, CreateDateColumn, Entity, Index, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'Pendente',
    PREPARING = 'Preparando',
    DELIVERED = 'Entregue',
    CANCELED = 'Cancelado',
}

export class OrderItem {
    @Column()
    plateId: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;
}
@Entity('tb_orders')
export class Order {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    @Index({ unique: true })
    id: string;

    @Column()
    userId: string;

    @Column()
    clientName: string;

    @Column()
    items: OrderItem[];

    @Column({ type: 'decimal' })
    total: number;

    @Column({ default: OrderStatus.PENDING })
    status: OrderStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}