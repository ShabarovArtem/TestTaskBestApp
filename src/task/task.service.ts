import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CookingTask } from './task.model';
import { TaskDto } from '../dto/create-task.dto';
import axios from 'axios';
import { CookingGateway } from '../socket/gateway';
import { ApiException } from '../errors/apiException';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(CookingTask) private taskRepository: typeof CookingTask,
    private readonly gateway: CookingGateway,
  ) {}

  async createTask(dto: TaskDto) {
    const { participantId, idMeal } = dto;

    const existingTask = await this.taskRepository.findOne({
      where: { participantId, idMeal },
    });

    if (existingTask) {
      throw ApiException.Conflict(
        'This task already exists for the participant',
      );
    }

    const meal = await this.getMeal(idMeal);

    if (!meal) {
      throw ApiException.NotFound('Meal not found');
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
      throw ApiException.BadRequest(
        'Failed to fetch meal data from external API',
      );
    }
  }

  async endTask(dto: TaskDto) {
    const { participantId, idMeal } = dto;

    const participant = await this.taskRepository.findOne({
      where: { participantId },
    });
    if (!participant) {
      throw ApiException.NotFound('Participant does not exist');
    }

    const task = await this.taskRepository.findOne({
      where: { participantId, idMeal },
    });

    if (!task) {
      throw ApiException.NotFound('No task found for this participant');
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
