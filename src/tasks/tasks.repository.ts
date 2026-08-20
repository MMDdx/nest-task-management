// tasks/tasks.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>, // Internal default repo
  ) {}

  async find(): Promise<Task[]> {
    return this.repository.find();
  }

  async findOne(id: string, user: User): Promise<Task | null> {
    return this.repository.findOne({where: {id, user}});
  }

  async createTask(task: CreateTaskDto, user: User) {
    const newTask = this.repository.create(task);
    newTask.user = user;
    newTask.status = TaskStatus.OPEN;
    return this.repository.save(newTask);
  }

  async DeleteTaskById(id: string, user: User) {
    const res = await this.repository.delete({id, user});
    if (res.affected === 0) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
  }

  async updateTaskById(id: string, body, field:string, user:User): Promise<Task> {
    const task = await this.findOne(id, user);
    if (!task) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    task[field] = body[field];
    return this.repository.save(task);
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
    const {status , search} = filterDto;
    const query = this.repository.createQueryBuilder('task');

    query.where({user})
    if (status) {
      query.andWhere('task.status = :status', {status});
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search : `%${search.toLowerCase()}%` },
      )
    }

    const tasks = await query.getMany()
    return tasks;
  }
}