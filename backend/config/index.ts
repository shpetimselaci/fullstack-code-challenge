import * as z from 'zod';

const envSchema = z.object({
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.number(),
});

const environmentVariables = envSchema.parse(process.env);

const config = {
  db: {
    host: environmentVariables.POSTGRES_HOST,
    port: environmentVariables.POSTGRES_PORT || 5432,
    user: environmentVariables.POSTGRES_USER,
    password: environmentVariables.POSTGRES_PASSWORD,
    database: environmentVariables.POSTGRES_DB,
  },
};

export default config;
