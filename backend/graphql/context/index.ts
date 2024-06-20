import { startStandaloneServer } from '@apollo/server/standalone';
import db from '../../db';
import { GraphQLError } from 'graphql';
import { BaseContext } from '@apollo/server';

export interface Context extends BaseContext {
  user: {
    id: number;
    fullName: string;
    birthdate: string;
  };
  userId: number;
}

export const contextFn: Parameters<typeof startStandaloneServer>['1']['context'] = async ({
  req,
}) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  // try to retrieve a user with the token
  const user = getUser(token);

  if (!user) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }

  // add the user to the context
  return { user, userId: user.id, db } as Context;
};
