import { NestFactory } from '@nestjs/core';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  OpenApiModule.setup(app, {
    title: 'My API',
    description: 'My API description',
    version: '1.0.0',
    path: 'api/docs',
    ui: 'scalar',
    scalar: {
      theme: 'mars',
    },
  });

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`API documentation is running on: http://localhost:${port}/api/docs`);
}

void bootstrap();
