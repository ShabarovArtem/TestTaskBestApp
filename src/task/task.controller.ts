import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookingTask } from './task.model';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create and send cooking task to kitchen' })
  @ApiResponse({ status: 201, type: CookingTask })
  @Post()
  async create(@Body() taskDto: CreateTaskDto) {
    return await this.taskService.createTask(taskDto);
  }

  @ApiOperation({ summary: 'End the task and save cooking time' })
  @ApiResponse({ status: 200, type: CookingTask })
  @Post('end')
  async endTask(@Body() taskDto: UpdateTaskDto) {
    return this.taskService.endTask(taskDto);
  }
}
