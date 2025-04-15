import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
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
  @ApiOperation({ summary: 'Get evaluations with optional filters' })
  @ApiResponse({ status: 200, type: [CookingEvaluation] })
  @Get()
  async getAll(
    @Query('idMeal') idMeal: string,
    @Query('participantId') participantId: string,
  ) {
    const filters = { idMeal, participantId };
    return this.evaluationService.getAllEvaluations(filters);
  }
  @ApiOperation({ summary: 'Get tasks sorted by time' })
  @ApiResponse({ status: 200, type: [CookingEvaluation] })
  @Get('time')
  getByTime() {
    return this.evaluationService.getTasksByTime();
  }
}
