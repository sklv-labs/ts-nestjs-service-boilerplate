import path from 'path';

import { loadEnv } from '@sklv-labs/ts-nestjs-config';

export const setupEnv = () => {
  loadEnv({
    config: {
      path: path.join(__dirname, '../../.env'),
    },
  });
};
