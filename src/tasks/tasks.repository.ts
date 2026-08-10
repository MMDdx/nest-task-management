// tasks/tasks.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>, // Internal default repo
  ) {}

  async find(): Promise<Task[]> {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOne({where: {id}});
  }

  async createTask(task: CreateTaskDto) {
    const newTask = this.repository.create(task);
    newTask.status = TaskStatus.OPEN;
    return this.repository.save(newTask);
  }

  async DeleteTaskById(id: string) {
    const res = await this.repository.delete(id)
    if (res.affected === 0) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
  }

  async updateTaskById(id: string, body, field:string): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    task[field] = body[field];
    return this.repository.save(task);
  }
}