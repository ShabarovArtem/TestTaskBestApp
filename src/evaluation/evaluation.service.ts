import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CookingEvaluation } from './evaluation.model';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { CookingTask } from '../task/task.model';

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
      throw new BadRequestException('Score must be between 0 and 10');
    }

    const task = await this.taskRepository.findOne({
      where: { participantId, idMeal },
    });

    if (!task) {
      throw new NotFoundException(
        'No task found for this participant with this meal',
      );
    }

    const existingEvaluation = await this.evaluationRepository.findOne({
      where: { participantId, idMeal },
    });

    if (existingEvaluation) {
      throw new ConflictException('Evaluation already exists');
    }

    const evaluation = await this.evaluationRepository.create({
      participantId,
      idMeal,
      score,
      comments,
    });

    return evaluation;
  }

  async getAllEvaluations(filters: {
    idMeal?: string;
    participantId?: string;
  }) {
    const { idMeal, participantId } = filters;

    const where: any = {};

    if (idMeal) {
      where.idMeal = idMeal;
    }

    if (participantId) {
      where.participantId = participantId;
    }

    const evaluations = await this.evaluationRepository.findAll({
      where,
      order: [['score', 'DESC']],
    });

    if (!evaluations.length) {
      throw new NotFoundException('No evaluations found for the given filters');
    }

    return evaluations;
  }

  async getTasksByTime() {
    const tasks = await this.taskRepository.findAll({
      order: [['timeMinutes', 'DESC']],
    });

    if (!tasks.length) {
      throw new NotFoundException('No tasks found');
    }

    return tasks;
  }
}
