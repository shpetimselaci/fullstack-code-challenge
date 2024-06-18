import * as answersService from '../../services/answers';

import { BaseContext } from '@apollo/server';
import { Resolvers } from '../../types';

const resolvers: Resolvers<BaseContext> = {
  Query: {
    questionAnswers: async (_, { limit, offset, id }, {}) => {
      return answersService.listQuestionAnswers({ id, limit, offset });
    },
  },
  Mutation: {
    addAnswer: async (_, { answer, questionId }) => {
      return await answersService.addAnswer({ answer, questionId, creatorId: 1 });
    },
    editAnswer: async (_, { answerId, answer }, {}) => {
      return await answersService.editAnswer({ id: answerId, answer, userId: 1 });
    },
    deleteAnswer: async (_, { answerId }, {}) => {
      return await answersService.deleteAnswer({ id: answerId, userId: 1 });
    },
  },
};

export default resolvers;
