import { integer, pgTable, serial, timestamp, unique, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { questions } from './questions';
import { users } from './users';

export const answers = pgTable(
  'answers',
  {
    id: serial('id').unique().primaryKey(),
    answer: varchar('name', { length: 256 }),
    questionId: integer('question_id').notNull(),
    creatorId: integer('creator_id').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
  },
  (t) => {
    return {
      questionAnswersIndex: unique('question_id_answer_id_created_at').on(
        questions.id,
        t.id,
        t.createdAt,
      ),
      userAnswersIndex: unique('user_id_answer_id_created_at').on(users.id, t.id, t.createdAt),
    };
  },
);

export const answerRelation = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  author: one(users, {
    fields: [answers.creatorId],
    references: [users.id],
  }),
}));

export type Answer = typeof answers.$inferSelect;
export type NewAnswer = typeof answers.$inferInsert;
