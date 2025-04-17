import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Participant } from './participants.model';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  imports: [SequelizeModule.forFeature([Participant])],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
