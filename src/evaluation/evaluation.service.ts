import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CookingEvaluation } from './evaluation.model';
import { CreateEvaluationDto } from '../dto/create-evaluation.dto';
import { CookingTask } from '../task/task.model';
import { ApiException } from '../errors/apiException';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(CookingEvaluation)
    private evaluationRepository: typeof CookingEvaluation,
    @InjectModel(CookingTask)
    private taskRepository: typeof CookingTask,
  ) {}

  async createEvaluation(dto: CreateEvaluationDto) {
    const { participantId, idMeal, score, comments } = dto;

    if (score < 0 || score > 10) {
      throw ApiException.BadRequest('Score must be between 0 and 10');
    }

    const task = await this.taskRepository.findOne({
      where: { participantId, idMeal },
    });

    if (!task) {
      throw ApiException.NotFound(
        'No task found for this participant with this meal',
      );
    }

    const existingEvaluation = await this.evaluationRepository.findOne({
      where: { participantId, idMeal },
    });

    if (existingEvaluation) {
      throw ApiException.Conflict('Evaluation already exists');
    }

    const evaluation = await this.evaluationRepository.create({
      participantId,
      idMeal,
      score,
      comments,
    });

    return evaluation;
  }

  async getEvaluationsByMeal(idMeal: string) {
    const evaluations = await this.evaluationRepository.findAll({
      where: { idMeal },
      order: [['score', 'DESC']],
    });

    if (!evaluations.length) {
      throw ApiException.NotFound('No evaluations found for this meal');
    }

    return evaluations;
  }

  async getEvaluationsByParticipant(participantId: string) {
    const evaluations = await this.evaluationRepository.findAll({
      where: { participantId },
      order: [['score', 'DESC']],
    });

    if (!evaluations.length) {
      throw ApiException.NotFound('No evaluations found for this participant');
    }

    return evaluations;
  }

  async getTasksByTime() {
    const tasks = await this.taskRepository.findAll({
      order: [['timeMinutes', 'DESC']],
    });

    if (!tasks.length) {
      throw ApiException.NotFound('No tasks found');
    }

    return tasks;
  }
}
