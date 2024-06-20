import { startStandaloneServer } from '@apollo/server/standalone';
import db from './db';

export const contextFn: Parameters<typeof startStandaloneServer>['1']['context'] = async ({
  req,
}) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  return {
    userId: req.headers.authorization,
    db: db,
  };
};
