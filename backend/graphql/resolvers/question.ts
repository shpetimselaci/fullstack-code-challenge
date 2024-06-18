import * as questionsService from '../../services/questions';
import { Resolvers } from '../../types';

const resolvers: Resolvers<{}> = {
  Query: {
    questions: async (_, { limit, offset }, {}) => {
      return questionsService.listQuestions({ limit, offset });
    },
  },
};

export default resolvers;
