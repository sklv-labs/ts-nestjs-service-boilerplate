import { Module } from '@nestjs/common';

import { AppControllerTest } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppControllerTest],
  providers: [AppService],
})
export class AppModule {}
