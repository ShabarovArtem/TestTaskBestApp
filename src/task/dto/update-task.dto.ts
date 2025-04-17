import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: '53068', description: 'Meal id', required: false })
  @IsString()
  readonly idMeal: string;

  @ApiProperty({
    example: 'sCuB5Xj',
    description: 'Participant id',
    required: false,
  })
  @IsString()
  readonly participantId: string;
}
