import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsService } from './participants.service';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Participant } from './participants.model';

@ApiTags('participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @ApiOperation({ summary: 'Create a participant' })
  @ApiResponse({ status: 201, type: Participant })
  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.createParticipant(createParticipantDto);
  }

  @ApiOperation({ summary: 'Get all participants' })
  @ApiResponse({ status: 200, type: [Participant] })
  @Get()
  getAll() {
    return this.participantsService.getAllParticipants();
  }

  @ApiOperation({ summary: 'Get participant by ID' })
  @ApiResponse({ status: 200, type: Participant })
  @Get(':participantId')
  getOne(@Param('participantId') participantId: string) {
    return this.participantsService.getOneParticipant(participantId);
  }

  @ApiOperation({ summary: 'Update participant' })
  @ApiResponse({ status: 200, type: Participant })
  @Put(':participantId')
  update(
    @Param('participantId') participantId: string,
    @Body() updateDto: UpdateParticipantDto,
  ) {
    return this.participantsService.updateParticipant(participantId, updateDto);
  }

  @ApiOperation({ summary: 'Delete participant' })
  @ApiResponse({ status: 200, type: Participant })
  @Delete(':participantId')
  delete(@Param('participantId') participantId: string) {
    return this.participantsService.deleteParticipant(participantId);
  }
}
