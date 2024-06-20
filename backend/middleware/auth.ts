import { verifyJWT } from '../utils/auth';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { User } from '../db/schemas';
import { Context } from '../graphql/context';
import { ContextFunction } from '@apollo/server';

export const authMiddleware: ContextFunction<[ExpressContextFunctionArgument], Context> = async ({
  req,
}) => {
  const user = verifyJWT(req.headers.authorization!) as User;
  return { user, userId: user.id };
};
