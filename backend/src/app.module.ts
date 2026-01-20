import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketConnectionGateway } from './common/socket-connection/socket-connection.gateway';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/homelink'),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, SocketConnectionGateway],
})
export class AppModule { }
