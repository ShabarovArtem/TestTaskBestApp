import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from '../dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  async create(@Body() taskDto: TaskDto) {
    await this.taskService.createTask(taskDto);

    return { message: 'Задание назначено' };
  }

  @Post('end')
  async endTask(@Body() taskDto: TaskDto) {
    return this.taskService.endTask(taskDto);
  }
}
