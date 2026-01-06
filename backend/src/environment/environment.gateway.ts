import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { DHT22Data } from "shared/src/types/DHT22/DHT22"

@WebSocketGateway({
    cors: {
        origin: "*"
    },
    trasports: ["websocket", "polling"],
    allowEIO3: true,
    pingInterval: 25000,
    pingTimeout: 60000
})
export class EnvironmentGateway {
    @WebSocketServer() private server: Server;
    @SubscribeMessage('sensor_data')
    handleMessage(client: any, payload: DHT22Data) {
        console.log(payload);
        this.server.emit("sensor_data", payload)
    }

    handleDisconnect(client: any) {
        console.log("DISCONNECTED ", client)
        
    }
    
}
