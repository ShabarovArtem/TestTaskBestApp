import { Injectable, NotFoundException } from '@nestjs/common';
import { Participant } from './participants.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

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
      throw new NotFoundException('No participants found');
    }
    return participants;
  }

  async getOneParticipant(participantId: string) {
    const participant =
      await this.participantRepository.findByPk(participantId);

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    return participant;
  }

  async updateParticipant(participantId: string, dto: UpdateParticipantDto) {
    const participant = await this.getOneParticipant(participantId);
    const updated = await participant.update({ fullName: dto.fullName });

    return updated;
  }

  async deleteParticipant(participantId: string) {
    const participant = await this.getOneParticipant(participantId);

    await participant.destroy();
    return { message: 'Participant deleted' };
  }
}
