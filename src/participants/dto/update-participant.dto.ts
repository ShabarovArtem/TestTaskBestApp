import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateParticipantDto {
  @ApiProperty({
    example: 'Ivanov Ivan Ivanovich',
    description: 'FullName',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly fullName?: string;
}
