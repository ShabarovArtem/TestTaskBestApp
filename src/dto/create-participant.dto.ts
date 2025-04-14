import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Ivanov Ivan Ivanovich', description: 'FullName' })
  readonly fullName: string;
}
