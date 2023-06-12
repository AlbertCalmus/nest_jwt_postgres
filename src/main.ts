import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin:
      /(https?:\/\/)?(localhost(:\d{4})?)/i,
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(morgan('tiny'));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Nest JWT PostgreSQL')
    .setDescription('API documentation for the Nest JWT PostgreSQL application')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND
    })
  );

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
