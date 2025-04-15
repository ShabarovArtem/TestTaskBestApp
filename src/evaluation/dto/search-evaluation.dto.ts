import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class SearchEvaluationDto extends PartialType(CreateEvaluationDto) {}
