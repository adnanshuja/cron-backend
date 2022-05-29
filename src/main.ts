import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/filters/allExceptionFilter';
import { HttpExceptionFilter } from './exception/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
