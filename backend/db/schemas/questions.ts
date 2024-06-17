import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { answers } from './answers';
import { users } from './users';

export const questions = pgTable('questions', {
  id: serial('id').unique().primaryKey(),
  title: varchar('name', { length: 123 }),
  description: varchar('description', { length: 256 }),
  authorId: integer('author_id').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const questionsRelations = relations(questions, ({ many, one }) => ({
  author: one(users, {
    fields: [questions.authorId],
    references: [users.id],
  }),
  answers: many(answers),
}));

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
