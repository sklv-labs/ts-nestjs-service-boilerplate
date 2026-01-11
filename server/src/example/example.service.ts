import { Injectable } from '@nestjs/common';
import { BaseError } from '@sklv-labs/ts-nestjs-error';
import { LoggerService } from '@sklv-labs/ts-nestjs-logger';

@Injectable()
export class ExampleService {
  constructor(private readonly logger: LoggerService) {}

  getHello(): string {
    this.logger.info('Example service');
    return 'Hello World!';
  }

  /**
   * Example: Resource not found pattern
   */
  async findUser(userId: string): Promise<{ id: string; name: string }> {
    // Simulate database lookup
    const user = { id: userId, name: 'John Doe' };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!user) {
      throw BaseError.notFound('User not found', 'USER_NOT_FOUND', {
        userId,
      });
    }

    return user;
  }

  /**
   * Example: Validation error (non-loggable)
   */
  async createUser(data: { email: string; name: string }): Promise<{ id: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Validation errors shouldn't be logged
    if (!data.email || !data.email.includes('@')) {
      throw new BaseError('Invalid email format', 'INVALID_EMAIL', {
        statusCode: 400,
        loggable: false, // Don't log validation errors
        exposeToClient: true,
        metadata: { email: data.email },
      });
    }

    // Simulate creation
    return { id: '123' };
  }

  /**
   * Example: Wrapping external errors
   */
  async callExternalApi(): Promise<unknown> {
    try {
      // Simulate external API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error('Connection timeout');
    } catch (error) {
      throw BaseError.fromError(error as Error, 'EXTERNAL_API_ERROR', {
        statusCode: 502, // Bad Gateway
        metadata: {
          service: 'external-api',
        },
        loggable: true, // Log external service failures
      });
    }
  }

  /**
   * Example: Business logic error
   */
  async processOrder(orderId: string, userId: string): Promise<void> {
    // Simulate order lookup
    const order = { id: orderId, userId: 'other-user', status: 'pending' };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!order) {
      throw BaseError.notFound('Order not found', 'ORDER_NOT_FOUND', {
        orderId,
      });
    }

    if (order.userId !== userId) {
      throw BaseError.forbidden("Cannot access another user's order", 'ORDER_ACCESS_DENIED', {
        orderId,
        userId,
        loggable: false, // Expected business logic error
      });
    }

    if (order.status === 'shipped') {
      throw BaseError.unprocessableEntity('Cannot modify shipped order', 'ORDER_ALREADY_SHIPPED', {
        orderId,
        status: order.status,
        loggable: false,
      });
    }

    // Process order...
  }
}
