import { ApolloServer } from '@apollo/server';
import typeDefs from './types';
import { startStandaloneServer } from '@apollo/server/standalone';
import { runtimeLogger } from './loggers/services';

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs });
  const { url } = await startStandaloneServer(server);
  runtimeLogger.info(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
