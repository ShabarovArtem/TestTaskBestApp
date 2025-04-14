import { Injectable } from '@nestjs/common';
import { Participant } from './participants.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { ApiException } from '../errors/apiException';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant) private participantRepository: typeof Participant,
  ) {}

  async createParticipant(dto: CreateParticipantDto) {
    const participant = await this.participantRepository.create(dto);
    return participant;
  }

  async getAllParticipants() {
    const participants = await this.participantRepository.findAll();

    if (participants.length === 0) {
      throw ApiException.NotFound('No participants found');
    }
    return participants;
  }

  async getOneParticipant(participantId: string) {
    const participant =
      await this.participantRepository.findByPk(participantId);

    if (!participant) {
      throw ApiException.NotFound('Participant not found');
    }

    return participant;
  }

  async updateParticipant(participantId: string, dto: UpdateParticipantDto) {
    const participant = await this.getOneParticipant(participantId);
    const updated = await participant.update({ fullName: dto.fullName });
    if (!participant) {
      throw ApiException.NotFound('Participant not found');
    }
    if (!updated) {
      throw ApiException.BadRequest('Failed to update participant');
    }
    return updated;
  }

  async deleteParticipant(participantId: string) {
    const participant = await this.getOneParticipant(participantId);
    if (!participant) {
      throw ApiException.NotFound('Participant not found');
    }
    await participant.destroy();
    return { message: 'Participant deleted' };
  }
}
