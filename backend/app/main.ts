import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';
import bootstrap from "app/bootstrap";

async function start() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  bootstrap(app);
  app.enableCors();
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5001;
  await app.listen(port);
  Logger.log(`Server is running on port: ${port}`);
}

start();
