import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: '53068', description: 'Meal id', required: false })
  @IsString()
  @IsOptional()
  readonly idMeal?: string;

  @ApiProperty({
    example: 'sCuB5Xj',
    description: 'Participant id',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly participantId?: string;
}
