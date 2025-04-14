import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from '../dto/create-evaluation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookingEvaluation } from './evaluation.model';

@ApiTags('evaluation')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @ApiOperation({ summary: 'Create evaluation for a task' })
  @ApiResponse({ status: 201, type: CookingEvaluation })
  @Post()
  async create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationService.createEvaluation(dto);
  }
  @ApiOperation({ summary: 'Get evaluations by meal' })
  @ApiResponse({ status: 200, type: [CookingEvaluation] })
  @Get('meal')
  getByMeal(@Query('idMeal') idMeal: string) {
    return this.evaluationService.getEvaluationsByMeal(idMeal);
  }
  @ApiOperation({ summary: 'Get evaluations by participant' })
  @ApiResponse({ status: 200, type: [CookingEvaluation] })
  @Get('participant')
  getByParticipant(@Query('participantId') participantId: string) {
    return this.evaluationService.getEvaluationsByParticipant(participantId);
  }
  @ApiOperation({ summary: 'Get tasks sorted by time' })
  @ApiResponse({ status: 200, type: [CookingEvaluation] })
  @Get('time')
  getByTime() {
    return this.evaluationService.getTasksByTime();
  }
}
