import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: '53068', description: 'Meal id' })
  readonly idMeal: string;
  @ApiProperty({ example: 'sCuB5Xj', description: 'Participant id' })
  readonly participantId: string;
}
