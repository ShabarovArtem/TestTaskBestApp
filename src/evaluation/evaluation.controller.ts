import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookingEvaluation } from './evaluation.model';
import { SearchEvaluationDto } from './dto/search-evaluation.dto';

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
  @Post('search')
  async getAll(@Body() body: SearchEvaluationDto) {
    return this.evaluationService.getAllEvaluations(body);
  }
}
