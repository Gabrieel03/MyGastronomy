import { Module } from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/oerders.entity';
import { PlatesModule } from '../plates/plates.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order]), PlatesModule,],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule { }