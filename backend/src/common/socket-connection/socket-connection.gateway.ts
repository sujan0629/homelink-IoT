import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*"
    },
    trasports: ["websocket", "polling"],
    allowEIO3: true,
    pingInterval: 25000,
    pingTimeout: 60000
})
export class SocketConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    handleConnection(client: Socket, ...args: any[]) {
        
    }
    @SubscribeMessage("device_connected")
    handleDeviceConnection(client: Socket) {
        client.join("device")
    }

    @SubscribeMessage("mobile_connected")
    handleMobileConnection(client: Socket) {
        client.join("mobile");
    }

    @SubscribeMessage("join_device")
    handlee(client: Socket, payload) {
        client.join(payload)
    }

    handleDisconnect(client: any) {
        console.log("DISCONNECTED ")
    }

}
