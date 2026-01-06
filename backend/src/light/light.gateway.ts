import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class LightGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server
    handleConnection(client: Socket, ...args: any[]) {
        
    }

    handleDisconnect(client: Socket) {
        
    }


    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        return 'Hello world!';
    }

    @SubscribeMessage("toggle-light")
    handleLightOn(client: Socket, payload: {on: boolean}){
        this.server.to("light-device").emit("light-on", {isOn: true});
    }
    
    
}
