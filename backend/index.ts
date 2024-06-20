import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { runtimeLogger } from './utils/loggers';
import allResolvers from './graphql/resolvers';
import { Context, contextFn } from './graphql/context';

async function startApolloServer() {
  const server = new ApolloServer<Context>({ typeDefs, resolvers: allResolvers });
  const { url } = await startStandaloneServer<Context>(server, { context: contextFn });
  runtimeLogger.info(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
