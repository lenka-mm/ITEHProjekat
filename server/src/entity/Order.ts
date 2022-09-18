import { PrimaryGeneratedColumn, ManyToOne, Column, Entity, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id?: number;


    @ManyToOne(() => User)
    user: User

    @Column()
    poslata: boolean

    @Column()
    adresa: string

    @Column()
    telefon: string

    @OneToMany(() => OrderItem, s => s.order)
    items: OrderItem[]
}