// eslint-disable-next-line import-x/order
import { setupEnv } from './load-env';

setupEnv();

import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@sklv-labs/ts-nestjs-logger';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(LoggerService);
  const config = app.get(ConfigService);

  app.useLogger(logger);

  app.setGlobalPrefix(config.globalPrefix);

  const isDocsEnabled = config.docs.enabled;

  if (isDocsEnabled) {
    OpenApiModule.setup(app, config.getOpenApiOptions());
  }

  const { port, host } = config.server;
  await app.listen(port, host);

  const appUrl = await app.getUrl();
  logger.log(`Application is running on ${appUrl}`);

  if (isDocsEnabled) {
    logger.log(`Swagger documentation available at ${appUrl}/${config.docs.path}`);
  }
}

void bootstrap();
