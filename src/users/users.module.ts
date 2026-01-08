import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BcryptService } from "../auth/bcrypt/bcrypt.service";
import { UsersController } from "./controller/users.controller";
import { Users } from "./entities/users.entity";
import { UsersService } from "./service/users.service";


@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService, BcryptService],
    exports: [UsersService, UsersModule]
})


export class UsersModule { }