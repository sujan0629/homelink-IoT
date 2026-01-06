import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketConnectionGateway } from './common/socket-connection/socket-connection.gateway';
import { LightGateway } from './light/light.gateway';
import { EnvironmentGateway } from './environment/environment.gateway';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, SocketConnectionGateway, EnvironmentGateway, LightGateway],
})
export class AppModule { }
