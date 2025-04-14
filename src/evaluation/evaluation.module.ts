import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CookingEvaluation } from './evaluation.model';
import { CookingTask } from '../task/task.model';

@Module({
  providers: [EvaluationService],
  controllers: [EvaluationController],
  imports: [SequelizeModule.forFeature([CookingEvaluation, CookingTask])],
})
export class EvaluationModule {}
