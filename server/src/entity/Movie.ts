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


  @Column()
  url: string;

  @ManyToOne(() => Genre)
  genre: Genre;
}