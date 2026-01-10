import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BcryptService } from "../../auth/bcrypt/bcrypt.service";
import { CreateUserDto } from "../dto/users.dto";
import { Users, UserRole } from "../entities/users.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private bcryptService: BcryptService,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {

        const emailExists = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        if (emailExists) throw new ConflictException('Email já cadastrado');

        const lastUser = await this.usersRepository.findOne({ order: { id: 'DESC' } as any });
        const lastNumber = lastUser && lastUser.id ? parseInt(lastUser.id, 10) : 0;
        const nextId = (lastNumber + 1).toString();


        const hashedPassword = await this.bcryptService.hash(createUserDto.password);
        const newUser = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            id: nextId,
            role: createUserDto.role as UserRole,
        });
        return this.usersRepository.save(newUser);
    }

    findAll() {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<Users> {

        const user = await this.usersRepository.findOne({
            where: { id: id }
        });

        if (!user) {
            throw new NotFoundException(`Usuário ID ${id} não encontrado`);
        }

        return user;
    }

    async update(id: string, updateUserDto: Partial<CreateUserDto>) {
        const user = await this.findOne(id);

        if (updateUserDto.password) {
            updateUserDto.password = await this.bcryptService.hash(updateUserDto.password);
        }

        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        return this.usersRepository.remove(user);
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }
}