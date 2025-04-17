import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchEvaluationDto {
  @ApiProperty({
    example: 'sCuB5Xj',
    description: 'Participant id',
    required: false,
  })
  @IsOptional()
  @IsString()
  participantId?: string;

  @ApiProperty({ example: '53068', description: 'Meal id', required: false })
  @IsOptional()
  @IsString()
  idMeal?: string;
}
