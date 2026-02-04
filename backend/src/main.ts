import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
  app.enableCors({
    origin: true, // Allow all origins for development
    credentials: true,
  });

}
bootstrap();
