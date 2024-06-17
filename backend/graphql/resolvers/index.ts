import { BaseContext } from '@apollo/server';
import { Resolver, Resolvers } from '../../types';
import dateScalar from '../scalars/date';
import answersResolvers from './answer';
import questionsResolvers from './question';
import usersResolvers from './user';

const allResolvers = [
  answersResolvers,
  questionsResolvers,
  usersResolvers,
  dateScalar,
] as Resolvers<BaseContext>[];

export default allResolvers;
