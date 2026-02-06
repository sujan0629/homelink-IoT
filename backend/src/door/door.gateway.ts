import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class DoorGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    handleConnection(client: Socket, ...args: any[]) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('toogle_door')
    handleDoorToggle(client: Socket, payload: { open: boolean }) {
        console.log('🚪 Door Toggle:', payload);
        // Broadcast to hardware and mobile clients so UI stays in sync
        this.server.to("device").emit("toogle_door", payload);
        this.server.to("mobile").emit("toogle_door", payload);
    }
}