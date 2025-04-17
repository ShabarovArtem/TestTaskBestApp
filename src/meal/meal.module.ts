import { Module } from '@nestjs/common';
import { MealService } from './meal.service';

@Module({
  providers: [MealService],
  exports: [MealService],
})
export class MealModule {}
