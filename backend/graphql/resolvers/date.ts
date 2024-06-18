import { BaseContext } from '@apollo/server';
import { Resolvers } from '../../types';
import dateScalar from '../scalars/date';

const resolvers: Resolvers<BaseContext> = {
  Date: dateScalar,
};

export default resolvers;
