import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { BaseError } from '@sklv-labs/ts-nestjs-error';
import { LoggerService } from '@sklv-labs/ts-nestjs-logger';

import { ExampleService } from './example.service';

class CreateUserDto {
  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Name' })
  name: string;
}

class ProcessOrderDto {
  @ApiProperty({ description: 'Order ID' })
  orderId: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;
}

@Controller('example')
@ApiTags('example')
export class ExampleController {
  constructor(
    private readonly logger: LoggerService,
    private readonly exampleService: ExampleService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Hello World' })
  getHello(): string {
    this.logger.info('Example controller');
    return this.exampleService.getHello();
  }

  @Post('error')
  @ApiOkResponse({ description: 'Error' })
  getError(): string {
    throw new Error('Test error');
  }

  @Post('base-error')
  @ApiOkResponse({ description: 'Base error' })
  getBaseError(): string {
    throw new BaseError('Test base error', 'TEST_BASE_ERROR', {
      statusCode: 400,
      metadata: {
        userId: '123',
      },
    });
  }

  @Post('create-user')
  @ApiOkResponse({ description: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() body: { email: string; name: string }) {
    return await this.exampleService.createUser(body);
  }

  @Post('call-external-api')
  @ApiOkResponse({ description: 'Call external API' })
  async callExternalApi(): Promise<unknown> {
    return await this.exampleService.callExternalApi();
  }

  @Post('process-order')
  @ApiOkResponse({ description: 'Process order' })
  @ApiBody({ type: ProcessOrderDto })
  async processOrder(@Body() body: ProcessOrderDto): Promise<void> {
    return await this.exampleService.processOrder(body.orderId, body.userId);
  }
}
