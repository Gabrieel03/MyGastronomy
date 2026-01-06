import { Module } from "@nestjs/common";
import { UsersController } from "./controller/users.controller";
import { UsersService } from "./service/users.service";
import { Type } from "class-transformer";
import { Users } from "./entities/users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, UsersModule]
})


export class UsersModule { }