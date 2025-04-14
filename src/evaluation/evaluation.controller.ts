import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from '../dto/create-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationService.createEvaluation(dto);
  }
  @Get('meal')
  getByMeal(@Query('idMeal') idMeal: string) {
    return this.evaluationService.getEvaluationsByMeal(idMeal);
  }

  @Get('participant')
  getByParticipant(@Query('participantId') participantId: string) {
    return this.evaluationService.getEvaluationsByParticipant(participantId);
  }

  @Get('time')
  getByTime() {
    return this.evaluationService.getTasksByTime();
  }
}
