import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CookingTask } from './task.model';
import { MealService } from './meal.service';
import { KitchenGateway } from '../kitchen/kitchen.gateway';

@Module({
  providers: [TaskService, KitchenGateway, MealService],
  controllers: [TaskController],
  imports: [SequelizeModule.forFeature([CookingTask])],
  exports: [TaskService],
})
export class TaskModule {}
