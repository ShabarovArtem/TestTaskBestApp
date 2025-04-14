import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationDto {
  @ApiProperty({ example: 'sCuB5Xj', description: 'Participant id' })
  readonly participantId: string;
  @ApiProperty({ example: '53068', description: 'Meal id' })
  readonly idMeal: string;
  @ApiProperty({ example: 6, description: 'Score (0-10)' })
  readonly score: number;
  @ApiProperty({
    example: 'My gran could do better! And she’s dead!',
    description: 'Comment',
    required: false,
  })
  readonly comments: string;
}
