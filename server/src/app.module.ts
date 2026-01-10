import { Module } from '@nestjs/common';
import { ConfigModule } from '@sklv-labs/ts-nestjs-config';
import { OpenApiModule } from '@sklv-labs/ts-nestjs-openapi';

import { AppControllerTest } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      providers: [ConfigService],
    }),
    OpenApiModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.getOpenApiOptions(),
    }),
  ],
  controllers: [AppControllerTest],
  providers: [AppService],
})
export class AppModule {}
