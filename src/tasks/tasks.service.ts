import { Injectable } from '@nestjs/common';
import {Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title : createTaskDto.title,
      description : createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id)
  }


  deleteTaskById(id : string) : Task | undefined {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index < 0) {
      return undefined;
    }
    return this.tasks.splice(index, 1)[0]
  }


  updateTaskById(id:string, field : string, body): Task| undefined{
    const ind = this.tasks.findIndex((t) => t.id === id);
    if (ind < 0) {
      return ;
    }
    this.tasks[ind][field] = body[field];
    return this.tasks[ind];
  }
}