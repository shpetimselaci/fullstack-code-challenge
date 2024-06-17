import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { runtimeLogger } from './loggers/services';
import allResolvers from './graphql/resolvers';
import { BaseContext } from '@apollo/server';

async function startApolloServer() {
  const server = new ApolloServer<BaseContext>({ typeDefs, resolvers: allResolvers });
  const { url } = await startStandaloneServer(server);
  runtimeLogger.info(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
