import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne(id,user);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    return this.taskRepository.DeleteTaskById(id,user);
  }

  async updateTaskById(id: string, field: string, body, user:User): Promise<Task> {
    return await this.taskRepository.updateTaskById(id, body, field, user);
  }
}