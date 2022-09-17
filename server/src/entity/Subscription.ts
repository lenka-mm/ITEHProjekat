import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

export type SubscriptionType = 'PPV' | 'ALL' | 'DATE'

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  movieId: number;

  @Column({ nullable: true })
  duration?: number

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ['PPV', 'ALL', 'DATE']
  })
  type: SubscriptionType

  @ManyToOne(() => Movie, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'movieId'
  })
  movie: Movie;
}