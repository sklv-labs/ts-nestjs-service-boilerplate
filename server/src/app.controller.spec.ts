import { Test, TestingModule } from '@nestjs/testing';

import { AppControllerTest } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppControllerTest;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppControllerTest],
      providers: [AppService],
    }).compile();

    appController = app.get<AppControllerTest>(AppControllerTest);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
