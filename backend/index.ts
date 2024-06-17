import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { runtimeLogger } from './loggers/services';
import allResolvers from './graphql/resolvers';

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers: allResolvers });
  const { url } = await startStandaloneServer(server);
  runtimeLogger.info(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
