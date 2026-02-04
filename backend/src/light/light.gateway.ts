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

    @SubscribeMessage("toggle_light")
    handleLightOn(client: Socket, payload: {on: boolean}){
        console.log("Light WOrking")
        this.server.to("device").emit("toggle_light", payload);
    }

}
