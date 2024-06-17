import { eq } from 'drizzle-orm';
import { DEFAULT_LIMIT } from '../constants';
import db from '../db';
import { answers } from '../db/schemas/answers';
import { questions } from '../db/schemas/questions';
import { users } from '../db/schemas/users';
import { PaginationParams } from '../common/types';

export const listUsers = async ({ limit = DEFAULT_LIMIT, offset = 0 }) => {
  const usersList = await db.select().from(users).offset(offset).limit(limit);

  return usersList;
};

export const listUserAnswers = async ({
  userId,
  limit = DEFAULT_LIMIT,
  offset = 0,
}: { userId: number } & PaginationParams) => {
  const userAnswers = await db
    .select()
    .from(answers)
    .where(eq(answers.creatorId, userId))
    .leftJoin(questions, eq(answers.questionId, questions.id))
    .rightJoin(users, eq(answers.creatorId, users.id))
    .offset(offset)
    .limit(limit);

  return userAnswers;
};

export const listUserQuestions = async ({
  userId,
  limit = DEFAULT_LIMIT,
  offset = 0,
}: { userId: number } & PaginationParams) => {
  const userQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.authorId, userId))
    .rightJoin(users, eq(answers.creatorId, users.id))
    .offset(offset)
    .limit(limit);

  return userQuestions;
};
