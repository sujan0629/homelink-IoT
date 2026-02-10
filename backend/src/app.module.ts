import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketConnectionGateway } from './common/socket-connection/socket-connection.gateway';
import { LightGateway } from './light/light.gateway';
import { DoorGateway } from './door/door.gateway';
import { EnvironmentGateway } from './environment/environment.gateway';
import { AuthModule } from './auth/auth.module';
import { FanGateway } from './fan/fan.gateway';
import { StatisticsModule } from './statistics/statistics.module';
import { EnvironmentModule } from './environment/environment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/homelink'),
        AuthModule,
        StatisticsModule,
        EnvironmentModule,
    ],
    controllers: [AppController],
    providers: [AppService, SocketConnectionGateway, LightGateway, DoorGateway, FanGateway],
})
export class AppModule { }
