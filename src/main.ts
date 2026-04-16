import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './common/filters/validation.filter'; // Import here

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // ← strips extra fields that are not in DTO
      forbidNonWhitelisted: true, // ← throws error if extra fields are sent
      transform: true,       // ← auto converts types (string "1" → number 1)
    }),
  );

  app.useGlobalFilters(new ValidationFilter());

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();