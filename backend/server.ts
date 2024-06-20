import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import typeDefs from './graphql';
import allResolvers from './graphql/resolvers';
import cors from 'cors';
import { runtimeLogger } from './utils/loggers';

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['https://', 'https://studio.apollographql.com'],
    }),
    express.json(),
    expressMiddleware(server),
  );

  app.get('/health', (req, res) => {
    res.status(200).send('Okay!');
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  runtimeLogger.info(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
