import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: '53068', description: 'Meal id' })
  @IsString()
  @IsNotEmpty()
  readonly idMeal: string;

  @ApiProperty({ example: 'sCuB5Xj', description: 'Participant id' })
  @IsString()
  @IsNotEmpty()
  readonly participantId: string;
}
