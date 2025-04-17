import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { ConfigModule } from '@nestjs/config';
import { axiosMealProvider } from '../http/http.provider';

@Module({
  imports: [ConfigModule],
  providers: [MealService, axiosMealProvider],
  exports: [MealService],
})
export class MealModule {}
