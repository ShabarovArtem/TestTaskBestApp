import { Column, DataType, Table } from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import { nanoid } from 'nanoid';
import { ApiProperty } from '@nestjs/swagger';

interface ParticipantsCreation {
  fullName: string;
}

@Table({ tableName: 'Participants' })
export class Participant extends Model<Participant, ParticipantsCreation> {
  @ApiProperty({ example: '1', description: 'primaryKey' })
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
    defaultValue: () => nanoid(7),
  })
  participantId: string;

  @ApiProperty({ example: 'Ivanov Ivan Ivanovich', description: 'FullName' })
  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;
}
