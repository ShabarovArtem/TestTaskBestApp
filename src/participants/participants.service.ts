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
    return await this.participantRepository.create(dto);
  }

  async getAllParticipants() {
    return await this.participantRepository.findAll();
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
    return await participant.update({ fullName: dto.fullName });
  }

  async deleteParticipant(participantId: string) {
    const participant = await this.getOneParticipant(participantId);

    await participant.destroy();
    return { message: 'Participant deleted' };
  }
}
