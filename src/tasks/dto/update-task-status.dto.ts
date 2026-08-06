import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';


export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  title: string;
}