import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParticipantsModule } from './participants/participants.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        models: [],
        autoLoadModels: true,
        synchronize: false,
        logging: false,
      }),
    }),
    ParticipantsModule,
    TaskModule,
    EvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
