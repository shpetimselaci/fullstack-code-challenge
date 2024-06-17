import * as userService from '../../services/users';

const resolvers = {
  Query: {
    users: userService.listUsers,
    userAnswers: userService.listUserAnswers,
    userQuestions: userService.listUserQuestions,
  },
};

export default resolvers;
