import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ClsModule, ClsService } from '@sklv-labs/ts-nestjs-cls';
import { ConfigModule } from '@sklv-labs/ts-nestjs-config';
import {
  BaseErrorExceptionFilter,
  HttpLoggingInterceptor,
  LoggerModule,
  LoggerService,
} from '@sklv-labs/ts-nestjs-logger';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

import { ConfigService, validationSchema } from './config';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    ClsModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema,
      providers: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.getLoggerOptions(),
    }),
    OpenApiModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.getOpenApiOptions(),
    }),
    ExampleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      inject: [LoggerService, ClsService],
      useFactory: (logger: LoggerService, cls: ClsService) =>
        new BaseErrorExceptionFilter(logger, cls),
    },
    {
      provide: APP_INTERCEPTOR,
      inject: [LoggerService, ClsService, ConfigService],
      useFactory: (logger: LoggerService, cls: ClsService, config: ConfigService) =>
        new HttpLoggingInterceptor(logger, cls, config.getHttpLoggingInterceptorOptions()),
    },
  ],
})
export class AppModule {}
