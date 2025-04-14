import { Column, DataType, Table } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { nanoid } from 'nanoid';

interface ParticipantsCreation {
  fullName: string;
}

@Table({ tableName: 'Participants' })
export class Participant extends Model<Participant, ParticipantsCreation> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
    defaultValue: () => nanoid(7),
  })
  participantId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;
}
