import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { DHT22Data } from "shared/src/types/DHT22/DHT22"
import { StatisticsService } from '../statistics/statistics.service';

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
    
    constructor(private readonly statisticsService: StatisticsService) {}
    
    @SubscribeMessage('sensor_data')
    async handleMessage(client: any, payload: DHT22Data) {
        // console.log(payload);
        this.server.to("mobile").emit("sensor_data", payload)
        
        // Save sensor reading to database
        try {
            await this.statisticsService.saveSensorReading({
                temperature: payload.temperature,
                humidity: payload.humidity,
                timestamp: payload.timestamp || Date.now()
            });
        } catch (error) {
            console.error('Error saving sensor reading:', error);
        }
    }

    handleDisconnect(client: any) {
        // console.log("DISCONNECTED ", client)
        
    }
    
}
