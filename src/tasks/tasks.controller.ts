import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task , TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { busboyExceptions } from '@nestjs/platform-express/multer/multer/multer.constants';


@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) :Task {
    return  this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string) :Task | undefined{
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/:field')
  updateTaskById(@Param('id') id:string, @Param('field') field:string, @Body() body){
    body[field] = <TaskStatus>body[field];
    return this.tasksService.updateTaskById(id, field, body);
  }

}
