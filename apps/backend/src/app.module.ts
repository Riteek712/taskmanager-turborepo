import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [ ConfigModule.forRoot(),TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService
    ,{
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    PrismaService
  ],
})
export class AppModule {}
