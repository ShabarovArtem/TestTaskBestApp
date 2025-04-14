import { IsOptional, IsString } from 'class-validator';

export class UpdateParticipantDto {
  @IsOptional()
  @IsString()
  readonly fullName: string;
}
