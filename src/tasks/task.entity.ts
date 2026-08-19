import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string

  @Column()
  status: TaskStatus;

  @Column({nullable: true})
  description: string

  @ManyToOne(_user => User, user => user.tasks, {eager: false})
  user: User;
}