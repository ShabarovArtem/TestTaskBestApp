import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CookingEvaluation } from './evaluation.model';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { TaskService } from '../task/task.service';
import { SearchEvaluationDto } from './dto/search-evaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(CookingEvaluation)
    private evaluationRepository: typeof CookingEvaluation,
    private taskService: TaskService,
  ) {}

  async createEvaluation(dto: CreateEvaluationDto) {
    const { participantId, idMeal, score, comments } = dto;

    if (score < 0 || score > 10) {
      throw new BadRequestException('Score must be between 0 and 10');
    }

    const task = await this.taskService.findTask(participantId, idMeal);

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

    return await this.evaluationRepository.create({
      participantId,
      idMeal,
      score,
      comments,
    });
  }

  async getAllEvaluations(filters: SearchEvaluationDto) {
    const { idMeal, participantId } = filters;

    const where: Partial<SearchEvaluationDto> = {};

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
}
