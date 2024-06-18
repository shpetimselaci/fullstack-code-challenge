import * as userService from '../../services/users';
import { Resolvers } from '../../types';
import { BaseContext } from '@apollo/server';

const resolvers: Pick<Resolvers<BaseContext>, 'Query'> = {
  Query: {
    users: async (_, { limit, offset }, {}) => {
      return await userService.listUsers({ limit, offset });
    },
    userAnswers: async (_, { limit, offset, userId }, {}) => {
      return await userService.listUserAnswers({ userId, limit, offset });
    },
    userQuestions: async (_, { limit, offset, userId }, {}) => {
      return await userService.listUserQuestions({ userId, limit, offset });
    },
  },
};
resolvers.Query?.userQuestions;

export default resolvers;
