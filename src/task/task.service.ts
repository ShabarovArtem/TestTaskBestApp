import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CookingTask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { CookingGateway } from '../kitchen/kitchen.gateway';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MealService } from './meal.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(CookingTask) private taskRepository: typeof CookingTask,
    private readonly gateway: CookingGateway,
    private readonly mealService: MealService,
  ) {}

  async createTask(dto: CreateTaskDto) {
    const { participantId, idMeal } = dto;

    const existingTask = await this.taskRepository.findOne({
      where: { participantId, idMeal },
    });

    if (existingTask) {
      throw new ConflictException(
        'This task already exists for the participant',
      );
    }

    const meal = await this.mealService.getMeal(idMeal);

    this.gateway.sendCookingChallenge(meal, participantId);

    const task = await this.taskRepository.create({
      participantId,
      idMeal,
    });

    return task;
  }

  async endTask(dto: UpdateTaskDto) {
    const { participantId, idMeal } = dto;

    const participant = await this.taskRepository.findOne({
      where: { participantId },
    });
    if (!participant) {
      throw new NotFoundException('Participant does not exist');
    }

    const task = await this.taskRepository.findOne({
      where: { participantId, idMeal },
    });

    if (!task) {
      throw new NotFoundException('No task found for this participant');
    }

    const endTime = new Date();
    const createdAt = task.createdAt;
    const ms = endTime.getTime() - createdAt.getTime();
    const minutes = Math.floor(ms / 60000);

    task.setDataValue('timeMinutes', minutes);
    await task.save();

    return task;
  }
}
