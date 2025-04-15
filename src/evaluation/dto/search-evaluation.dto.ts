import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchEvaluationDto {
  @ApiProperty({
    example: 'sCuB5Xj',
    description: 'Participant id',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly participantId?: string;

  @ApiProperty({ example: '53068', description: 'Meal id', required: false })
  @IsOptional()
  @IsString()
  readonly idMeal?: string;

  @ApiProperty({ example: 6, description: 'Score (0-10)', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  readonly score?: number;

  @ApiProperty({
    example: 'My gran could do better! And she’s dead!',
    description: 'Comment',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly comments?: string;
}
