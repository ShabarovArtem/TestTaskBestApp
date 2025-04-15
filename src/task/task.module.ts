import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CookingTask } from './task.model';
import { CookingGateway } from '../kitchen/kitchenGateway';
import { MealService } from './meal.service';

@Module({
  providers: [TaskService, CookingGateway, MealService],
  controllers: [TaskController],
  imports: [SequelizeModule.forFeature([CookingTask])],
})
export class TaskModule {}
