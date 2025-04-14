import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParticipantsModule } from './participants/participants.module';
import { ConfigModule } from '@nestjs/config';
import { Participant } from './participants/participants.model';
import { CookingTask } from './task/task.model';
import { TaskModule } from './task/task.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Participant, CookingTask],
      autoLoadModels: true,
      logging: false,
    }),
    ParticipantsModule,
    TaskModule,
    EvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
