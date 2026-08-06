import { Injectable, NotFoundException } from '@nestjs/common';
import {Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const {status, search} = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task: Task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
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

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id)
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }


  deleteTaskById(id : string) : Task | undefined {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index < 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
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