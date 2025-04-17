import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CookingTask } from './task.model';
import { ParticipantsModule } from '../participants/participants.module';
import { MealModule } from '../meal/meal.module';
import { KitchenGateway } from '../kitchen/kitchen.gateway';

@Module({
  providers: [TaskService, KitchenGateway],
  controllers: [TaskController],
  imports: [
    SequelizeModule.forFeature([CookingTask]),
    ParticipantsModule,
    MealModule,
  ],
  exports: [TaskService],
})
export class TaskModule {}
