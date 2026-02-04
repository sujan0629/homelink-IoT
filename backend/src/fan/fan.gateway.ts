import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class FanGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    handleConnection(client: Socket) {
        console.log('Fan client connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Fan client disconnected:', client.id);
    }

    @SubscribeMessage('toggle-fan')
    handleFanToggle(client: Socket, payload: { on: boolean }) {
        console.log('Fan Toggle:', payload);
        this.server.to('device').emit('toggle_fan', payload);
        this.server.to('mobile').emit('fan-on', payload);
    }
}
