import { ApiProperty } from '@nestjs/swagger';

export class UpdateParticipantDto {
  @ApiProperty({ example: 'Ivanov Ivan Ivanovich', description: 'FullName' })
  readonly fullName: string;
}
