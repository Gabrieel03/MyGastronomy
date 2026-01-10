import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, Index, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity("tb_users")
export class Users {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true })
    @Index()
    id: string

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Column({ nullable: true })
    foto: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}