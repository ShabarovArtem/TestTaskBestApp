import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateEvaluationDto {
  @ApiProperty({ example: 'sCuB5Xj', description: 'Participant id' })
  @IsString()
  readonly participantId: string;

  @ApiProperty({ example: '53068', description: 'Meal id' })
  @IsString()
  readonly idMeal: string;

  @ApiProperty({ example: 6, description: 'Score (0-10)' })
  @IsInt()
  @Min(0)
  @Max(10)
  readonly score: number;

  @ApiProperty({
    example: 'My gran could do better! And she’s dead!',
    description: 'Comment',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly comments: string;
}
