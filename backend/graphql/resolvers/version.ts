import { BaseContext } from '@apollo/server';
import { Resolvers } from '../../types';
import dateScalar from '../scalars/date';
import config from '../../config';

const resolvers: Resolvers<BaseContext> = {
  Query: {
    version: () => `${config.version}`,
  },
};

export default resolvers;
