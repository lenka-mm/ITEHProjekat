import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";
import { Order } from "./Order";


@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(() => Order, { onDelete: 'CASCADE' })
    order: Order;

    @ManyToOne(t => Movie, { eager: true })
    movie: Movie;


    @Column()
    amount: number;
}