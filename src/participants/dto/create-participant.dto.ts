import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Ivanov Ivan Ivanovich', description: 'FullName' })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;
}
