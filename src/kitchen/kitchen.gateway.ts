import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MealBasic } from '../task/meal.service';
import { ParticipantsService } from '../participants/participants.service';

@WebSocketGateway({ namespace: '/kitchen' })
@Injectable()
export class KitchenGateway implements OnGatewayConnection {
  constructor(private readonly participantService: ParticipantsService) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const participantId = client.handshake.query.participantId as string;

    const exists =
      await this.participantService.getOneParticipant(participantId);
    if (!exists) {
      client.disconnect(true);
      return;
    }

    client.join(participantId);
  }

  sendCookingChallenge(mealDetails: MealBasic, participantId: string) {
    this.server.to(participantId).emit('CookingChallenge', mealDetails);
  }
}
