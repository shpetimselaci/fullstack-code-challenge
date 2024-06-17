import environmentVariables from './env';

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
