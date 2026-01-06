import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { CreateUserDto } from '../dto/users.dto'; // ou create-user.dto dependendo do seu nome
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'; // <--- IMPORTANTE: Importar isso do driver mongodb

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        const emailExists = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (emailExists) {
            throw new ConflictException('Este email já está cadastrado!');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const newUser = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    // --- CORREÇÃO AQUI ---
    async findOne(id: string): Promise<Users> {
        // Convertemos a string 'id' para um ObjectId do Mongo
        const user = await this.usersRepository.findOne({
            where: { _id: new ObjectId(id) }
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }

    async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<Users> { // Use Partial para atualização
        const user = await this.findOne(id); // Reusa o método acima para checar se existe

        // Se estiver atualizando o email, verifica se já não existe outro igual
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const emailExists = await this.usersRepository.findOne({
                where: { email: updateUserDto.email },
            });
            if (emailExists) {
                throw new ConflictException('Este email já está cadastrado!');
            }
        }

        // Se estiver atualizando a senha, criptografa novamente
        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt(10);
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
        }

        // Atualiza o objeto na memória e salva
        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<Users> {
        const user = await this.findOne(id);
        return this.usersRepository.remove(user);
    }
}
