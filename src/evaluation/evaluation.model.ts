import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { Participant } from '../participants/participants.model';

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
  @ForeignKey(() => Participant)
  @Column({ type: DataType.STRING })
  participantId: string;

  @BelongsTo(() => Participant)
  participant: Participant;

  @Column({ type: DataType.STRING })
  idMeal: string;

  @Column({ type: DataType.INTEGER })
  score: number;

  @Column({ type: DataType.STRING, allowNull: true })
  comments: string;
}
