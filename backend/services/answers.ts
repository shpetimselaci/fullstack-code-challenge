import { and, eq, getTableColumns } from 'drizzle-orm';
import { DEFAULT_LIMIT } from '../constants';
import db from '../db';
import { PaginationParams } from '../common/types';
import { answers, users, questions, NewAnswer, Answer } from '../db/schemas';
import { alias } from 'drizzle-orm/pg-core';

export const listQuestionAnswers = async ({
  id,
  limit,
  offset,
}: { id: number } & PaginationParams) => {
  const authors = alias(users, 'author');

  const { authorId, ...questionColumns } = getTableColumns(questions);
  const questionAnswers = await db
    .select({
      id: answers.id,
      answer: answers.answer,
      author: getTableColumns(authors),
      question: questionColumns,
      createdAt: answers.createdAt,
      updatedAt: answers.updatedAt,
    })
    .from(answers)
    .where(and(eq(answers.questionId, id), eq(answers.deleted, false)))
    .leftJoin(questions, eq(answers.questionId, questions.id))
    .rightJoin(authors, eq(answers.creatorId, users.id))
    .offset(offset || 0)
    .limit(limit || DEFAULT_LIMIT);

  return questionAnswers as Required<typeof questionAnswers>;
};

export const addAnswer = async (newUser: Omit<NewAnswer, 'createdAt' | 'updatedAt'>) => {
  const newAnswer = await db
    .insert(answers)
    .values({
      ...newUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newAnswer;
};

export const editAnswer = async ({
  id,
  answer,
  userId,
}: Pick<Answer, 'id' | 'answer'> & { userId: number }) => {
  const updatedAnswer = await db
    .update(answers)
    .set({
      answer,
      updatedAt: new Date(),
    })
    .where(and(eq(answers.id, id), eq(answers.creatorId, userId), eq(answers.deleted, false)));
};

export const deleteAnswer = async ({
  id,
  userId,
}: Pick<Answer, 'id' | 'answer'> & { userId: number }) => {
  const updatedAnswer = await db
    .update(answers)
    .set({
      deleted: true,
      updatedAt: new Date(),
    })
    .where(and(eq(answers.id, id), eq(answers.creatorId, userId)));

  return updatedAnswer;
};
