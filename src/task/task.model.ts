import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { Participant } from '../participants/participants.model';
import { ApiProperty } from '@nestjs/swagger';

interface CookingTaskCreation {
  idMeal: string;
  participantId: string;
}

@Table({ tableName: 'CookingTask' })
export class CookingTask extends Model<CookingTask, CookingTaskCreation> {
  @ApiProperty({ example: '53068', description: 'Meal id' })
  @Column({ type: DataType.STRING, allowNull: false })
  idMeal: string;

  @ApiProperty({ example: 'sCuB5Xj', description: 'Participant id' })
  @ForeignKey(() => Participant)
  @Column({ type: DataType.STRING, allowNull: false })
  participantId: string;

  @BelongsTo(() => Participant)
  participant: Participant;

  @ApiProperty({ example: 30, description: 'Time the task in minutes' })
  @Column({ type: DataType.INTEGER, defaultValue: null })
  timeMinutes: number;
}
