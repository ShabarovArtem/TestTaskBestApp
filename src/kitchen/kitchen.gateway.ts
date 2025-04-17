import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MealBasic } from '../task/meal.service';

@WebSocketGateway({ namespace: '/kitchen' })
@Injectable()
export class KitchenGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const participantId = client.handshake.query.participantId as string;

    if (!participantId) {
      client.disconnect(true);
      return;
    }

    client.join(participantId);
  }

  sendCookingChallenge(mealDetails: MealBasic, participantId: string) {
    this.server.to(participantId).emit('CookingChallenge', mealDetails);
  }
}
