import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subscription } from "./Subscription";
import { User } from "./User";

@Entity()
export class UserSubscription {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @CreateDateColumn()
  startDate: number;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  dueDate?: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Subscription)
  subscription: Subscription;
}