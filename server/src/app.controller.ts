import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiTags('app')
export class AppControllerTest {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Hello World' })
  getHello(): string {
    return this.appService.getHello();
  }
}
