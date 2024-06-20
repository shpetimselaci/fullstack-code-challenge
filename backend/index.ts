import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { runtimeLogger } from './utils/loggers';
import allResolvers from './graphql/resolvers';
import { BaseContext } from '@apollo/server';
import { contextFn } from './context';

async function startApolloServer() {
  const server = new ApolloServer<BaseContext>({ typeDefs, resolvers: allResolvers });
  const { url } = await startStandaloneServer(server, { context: contextFn });
  runtimeLogger.info(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
