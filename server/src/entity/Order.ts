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
    sent: boolean

    @Column()
    address: string

    @Column()
    phone: string

    @OneToMany(() => OrderItem, s => s.order)
    items: OrderItem[]
}