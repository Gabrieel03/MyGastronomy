import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlateDto } from '../dto/plates.dto';
import { UpdatePlateDto } from '../dto/update-plates.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plate } from '../entities/plates.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlatesService {
    constructor(
        @InjectRepository(Plate)
        private plateRepository: Repository<Plate>,
    ) { }

    async create(createPlateDto: CreatePlateDto): Promise<Plate> {
        const lastPlate = await this.plateRepository.findOne({
            order: { id: 'DESC' } as any,
        });

        const lastNumber = lastPlate ? parseInt(lastPlate.id, 10) : 0;
        const nextNumber = lastNumber + 1;

        const nextIdString = nextNumber.toString().padStart(3, '0');

        const newPlate = this.plateRepository.create({
            ...createPlateDto,
            id: nextIdString,
        });

        return this.plateRepository.save(newPlate);
    }

    findAll() {
        return this.plateRepository.find();
    }

    async findOne(id: string) {
        const plate = await this.plateRepository.findOne({ where: { id } });

        if (!plate) {
            throw new NotFoundException(`Prato #${id} não encontrado`);
        }

        return plate;
    }

    async findByCategoria(category: string) {
        const plates = await this.plateRepository.find({ where: { category } });

        if (!plates || plates.length === 0) {
            throw new NotFoundException(`Nenhum prato encontrado para a categoria: ${category}`);
        }

        return plates;

    }

    async update(id: string, updatePlateDto: UpdatePlateDto) {
        const plate = await this.findOne(id);
        Object.assign(plate, updatePlateDto);
        return this.plateRepository.save(plate);
    }

    async remove(id: string) {
        const plate = await this.findOne(id);
        return this.plateRepository.remove(plate);
    }
}