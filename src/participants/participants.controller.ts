import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { ParticipantsService } from './participants.service';
import { UpdateParticipantDto } from '../dto/update-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}
  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.createParticipant(createParticipantDto);
  }

  @Get()
  getAll() {
    return this.participantsService.getAllParticipants();
  }

  @Get(':participantId')
  getOne(@Param('participantId') participantId: string) {
    return this.participantsService.getOneParticipant(participantId);
  }

  @Put(':participantId')
  update(
    @Param('participantId') participantId: string,
    @Body() updateDto: UpdateParticipantDto,
  ) {
    return this.participantsService.updateParticipant(participantId, updateDto);
  }

  @Delete()
  delete(@Body() body: { participantId: string }) {
    return this.participantsService.deleteParticipant(body.participantId);
  }
}
