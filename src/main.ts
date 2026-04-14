import 'dotenv/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { AllExceptionsFilter } from '@/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors();

  // prefixes api endpoints with /api/v1
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
