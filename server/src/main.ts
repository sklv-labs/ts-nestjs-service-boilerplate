// eslint-disable-next-line import-x/order
import { setupEnv } from './load-env';

setupEnv();

import { NestFactory } from '@nestjs/core';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.globalPrefix);

  const isDocsEnabled = config.docs.enabled;

  if (isDocsEnabled) {
    OpenApiModule.setup(app, config.getOpenApiOptions());
  }

  const { port, host } = config.server;
  await app.listen(port, host);

  const appUrl = await app.getUrl();
  console.log(`Application is running on ${appUrl}`);

  if (isDocsEnabled) {
    console.log(`Swagger documentation available at ${appUrl}/${config.docs.path}`);
  }
}

void bootstrap();
