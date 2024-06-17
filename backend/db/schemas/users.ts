import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar, date, timestamp } from 'drizzle-orm/pg-core';
import { questions } from './questions';
import { answers } from './answers';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  birthday: date('birthday', { mode: 'string' }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const usersRelations = relations(users, ({ many }) => ({
  questions: many(questions),
  answers: many(answers),
}));
