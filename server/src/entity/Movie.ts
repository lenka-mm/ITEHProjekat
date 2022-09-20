import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./Genre";


@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    plot: string;


    @Column({ nullable: true })
    url?: string;

    @Column()
    image: string;

    @Column()
    price: number;


    @ManyToOne(() => Genre)
    genre: Genre;
}