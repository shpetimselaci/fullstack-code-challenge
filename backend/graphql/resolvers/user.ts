import { GraphQLFieldResolverParams } from '@apollo/server';
import * as userService from '../../services/users';
import { Resolvers } from '../../types';
import { BaseContext } from '@apollo/server';

const resolvers: Pick<Resolvers<BaseContext>, 'Query'> = {
  Query: {
    users: (_, { limit, offset }, { dataSources }) => {
      return userService.listUsers({ limit, offset });
    },
    userAnswers: userService.listUserAnswers,
    userQuestions: userService.listUserQuestions,
  },
};
resolvers.Query?.userQuestions;

export default resolvers;
