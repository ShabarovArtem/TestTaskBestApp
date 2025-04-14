import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { Participant } from '../participants/participants.model';

interface CookingTaskCreation {
  idMeal: string;
  participantId: string;
}

@Table({ tableName: 'CookingTask' })
export class CookingTask extends Model<CookingTask, CookingTaskCreation> {
  @Column({ type: DataType.STRING, allowNull: false })
  idMeal: string;

  @ForeignKey(() => Participant)
  @Column({ type: DataType.STRING, allowNull: false })
  participantId: string;

  @BelongsTo(() => Participant)
  participant: Participant;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  timeMinutes: number;
}
