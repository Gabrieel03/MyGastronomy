import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, Index, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ default: 'user' })
    role: string;

    @Column({ nullable: true })
    foto: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}