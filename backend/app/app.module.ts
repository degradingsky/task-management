import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
