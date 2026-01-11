import {
  getAppName,
  getAppVersion,
  getEnvironment,
  isProduction,
} from '@sklv-labs/ts-core/environment';
import { ServiceBaseConfigService } from '@sklv-labs/ts-nestjs-config';
import { HttpLoggingInterceptorOptions, LoggerModuleOptions } from '@sklv-labs/ts-nestjs-logger';
import { OpenApiModuleOptions } from '@sklv-labs/ts-nestjs-openapi';

import { EnvType } from './env.schema';

export class ConfigService extends ServiceBaseConfigService<EnvType> {
  docs = {
    enabled: this.env.DOCS_ENABLED,
    path: this.env.DOCS_PATH,
  };

  globalPrefix = 'api/v1';

  getOpenApiOptions(): OpenApiModuleOptions {
    return {
      title: getAppName(),
      description: `OpenAPI documentation for the ${getAppName()} application. \nVersion: ${getAppVersion()}. \nEnvironment: ${getEnvironment()}.`,
      version: getAppVersion(),
      path: this.docs.path,
      ui: 'scalar',
      scalar: {
        theme: 'default',
      },
    };
  }

  getLoggerOptions(): LoggerModuleOptions {
    return {
      appName: getAppName(),
      environment: getEnvironment(),
      prettyPrint: !isProduction(),
    };
  }

  getHttpLoggingInterceptorOptions(): HttpLoggingInterceptorOptions {
    return {
      logRequestBody: true,
      logResponseBody: true,
      logQuery: true,
      logHeaders: true,
    };
  }
}
