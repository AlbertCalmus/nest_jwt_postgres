import { Module } from '@nestjs/common';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost]
    },
    AppService
  ]
})
export class AppModule {}
