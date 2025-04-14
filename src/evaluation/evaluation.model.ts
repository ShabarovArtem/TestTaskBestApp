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

interface EvaluationCreation {
  participantId: string;
  idMeal: string;
  score: number;
  comments: string;
}

@Table({ tableName: 'CookingEvaluation' })
export class CookingEvaluation extends Model<
  CookingEvaluation,
  EvaluationCreation
> {
  @ApiProperty({ example: 'sCuB5Xj', description: 'Participant id' })
  @ForeignKey(() => Participant)
  @Column({ type: DataType.STRING })
  participantId: string;

  @BelongsTo(() => Participant)
  participant: Participant;

  @ApiProperty({ example: '53068', description: 'Meal id' })
  @Column({ type: DataType.STRING })
  idMeal: string;

  @ApiProperty({ example: 6, description: 'Score (0-10)' })
  @Column({ type: DataType.INTEGER })
  score: number;

  @ApiProperty({
    example: 'My gran could do better! And she’s dead!',
    description: 'Comment',
    required: false,
  })
  @Column({ type: DataType.STRING, allowNull: true })
  comments: string;
}
