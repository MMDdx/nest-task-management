import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({unique:true})
  username: string;
  @Column()
  password: string;

  @OneToMany(_type => Task, task => task.user, {eager: true})
  @Exclude({toPlainOnly: true})
  tasks: Task[];

}