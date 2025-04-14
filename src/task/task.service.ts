import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CookingTask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import axios from 'axios';
import { CookingGateway } from '../socket/gateway';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(CookingTask) private taskRepository: typeof CookingTask,
    private readonly gateway: CookingGateway,
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

    const meal = await this.getMeal(idMeal);

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    this.gateway.sendCookingChallenge(meal, participantId);

    const task = await this.taskRepository.create({
      participantId,
      idMeal,
    });

    return task;
  }

  async getMeal(idMeal: string) {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`,
      );

      return response.data.meals;
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch meal data from external API',
      );
    }
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
    const Ms = endTime.getTime() - createdAt.getTime();
    const Minutes = Math.floor(Ms / 60000);

    task.setDataValue('timeMinutes', Minutes);
    await task.save();

    return task;
  }
}
