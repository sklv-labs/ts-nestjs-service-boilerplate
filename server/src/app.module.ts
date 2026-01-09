import { Module } from '@nestjs/common';
import { OpenApiModule, OpenApiModuleOptions } from '@sklv-labs/ts-nestjs-openapi';

import { AppControllerTest } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    OpenApiModule.forRootAsync({
      useFactory: (): OpenApiModuleOptions => ({
        title: 'My API',
        description: 'My API description',
        version: '1.0.0',
        path: 'api/docs',
        ui: 'scalar',
        scalar: {
          theme: 'default',
        },
      }),
    }),
  ],
  controllers: [AppControllerTest],
  providers: [AppService],
})
export class AppModule {}
