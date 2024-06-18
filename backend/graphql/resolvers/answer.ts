import * as answersService from '../../services/answers';

import { BaseContext } from '@apollo/server';
import { Resolvers } from '../../types';

const resolvers: Resolvers<BaseContext> = {
  Query: {
    questionAnswers: async (_, { limit, offset, id }, {}) => {
      return answersService.listQuestionAnswers({ id, limit, offset }) as any;
    },
  },
};

export default resolvers;
