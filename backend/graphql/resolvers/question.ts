import { BaseContext } from '@apollo/server';
import * as questionsService from '../../services/questions';
import { Resolvers } from '../../types';

const resolvers: Resolvers<BaseContext> = {
  Query: {
    questions: async (_, { limit, offset }, {}) => {
      return questionsService.listQuestions({ limit, offset });
    },
  },
  Mutation: {
    addQuestion: async (_, { title, description }) => {
      return await questionsService.addQuestion({ title, description, authorId: 1 });
    },
    editQuestion: async (_, { questionId, title, description }, {}) => {
      return await questionsService.editQuestion({ id: questionId, title, description, userId: 1 });
    },
    deleteQuestion: async (_, { questionId }, {}) => {
      return await questionsService.deleteQuestion({ id: questionId, userId: 1 });
    },
  },
};

export default resolvers;
