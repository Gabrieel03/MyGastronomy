import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plate } from './entities/plates.entity';
import { PlatesController } from './controller/plates.controller';
import { PlatesService } from './service/plates.service';

@Module({
    imports: [TypeOrmModule.forFeature([Plate])],
    controllers: [PlatesController],
    providers: [PlatesService],
    exports: [PlatesService]
})
export class PlatesModule { }