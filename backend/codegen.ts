import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema.graphql',
  generates: {
    './types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
