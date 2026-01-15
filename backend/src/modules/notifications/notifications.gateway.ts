import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // Initial connection
  }

  handleDisconnect(client: Socket) {
    // Client disconnected
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: string) {
    if (userId) {
      client.join(`user_${userId}`);
      console.log(`User ${userId} joined their private notification room`);
    }
  }

  sendToUser(userId: string, data: any) {
    this.server.to(`user_${userId}`).emit('notification', data);
  }
}
