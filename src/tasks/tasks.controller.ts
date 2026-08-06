import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task , TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { busboyExceptions } from '@nestjs/platform-express/multer/multer/multer.constants';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';


@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters call service with filters
    if (Object.keys(filterDto)) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
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
  updateTaskById(@Param('id') id:string, @Param('field') field:string, @Body() updateTaskStatusDto:UpdateTaskStatusDto){
    return this.tasksService.updateTaskById(id, field, updateTaskStatusDto);
  }

}
