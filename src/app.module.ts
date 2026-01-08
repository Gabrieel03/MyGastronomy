import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Plate } from './plates/entities/plates.entity';
import { PlatesModule } from './plates/plates.module';
import { Users } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/oerders.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as "mongodb",
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      entities: [Users, Plate,Order],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    PlatesModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }