import { baseEnvSchema } from '@sklv-labs/ts-nestjs-config';
import { z } from 'zod';

export const validationSchema = baseEnvSchema.extend({
  DOCS_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .or(z.boolean())
    .default(true),
  DOCS_PATH: z.string().default('api/docs'),
});

export type EnvType = z.infer<typeof validationSchema>;
