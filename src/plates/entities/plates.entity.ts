import { Column, CreateDateColumn, Entity, Index, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('tb_plates')
export class Plate {

    @ObjectIdColumn()
    _id: string;

    @Column({ unique: true })
    @Index()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column('simple-array')
    ingredients: string[];

    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}