import { and, eq, getTableColumns } from 'drizzle-orm';
import { DEFAULT_LIMIT } from '../constants';
import db from '../db';
import { NonNullableObject, PaginationParams } from '../common/types';
import { users, questions, NewQuestion } from '../db/schemas';
import { alias } from 'drizzle-orm/pg-core';
import { Question } from '../types';

export const listQuestions = async ({ limit, offset }: PaginationParams) => {
  const authors = alias(users, 'author');

  const questionAnswers = await db
    .select({
      ...getTableColumns(questions),
      author: getTableColumns(authors),
    })
    .from(questions)
    .where(eq(questions.deleted, false))
    .rightJoin(authors, eq(questions.authorId, authors.id))
    .orderBy(questions.createdAt)
    .offset(offset || 0)
    .limit(limit || DEFAULT_LIMIT);

  return questionAnswers as NonNullableObject<typeof questionAnswers>;
};

type T = Required<Awaited<ReturnType<typeof listQuestions>>>;

export const addQuestion = async (newQuestion: Omit<NewQuestion, 'createdAt' | 'updatedAt'>) => {
  const newAnswer = await db
    .insert(questions)
    .values({
      ...newQuestion,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newAnswer;
};

export const editQuestion = async ({
  id,
  title,
  description,
  userId,
}: Pick<Question, 'id' | 'title' | 'description'> & { userId: number }) => {
  const updatedQuestion = await db
    .update(questions)
    .set({
      title,
      description,
      updatedAt: new Date(),
    })
    .where(and(eq(questions.id, id), eq(questions.authorId, userId)));

  return updatedQuestion;
};

export const deleteAnswer = async ({ id, userId }: Pick<Question, 'id'> & { userId: number }) => {
  const updatedQuestion = await db
    .update(questions)
    .set({
      deleted: true,
      updatedAt: new Date(),
    })
    .where(and(eq(questions.id, id), eq(questions.authorId, userId)));

  return updatedQuestion;
};
