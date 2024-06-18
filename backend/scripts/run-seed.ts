import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import config from '../config';
import * as schema from '../db/schemas';
import { faker } from '@faker-js/faker';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { runtimeLogger } from '../loggers/services';

const client = new Client(
  `postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`,
);

// This will push seed on the database
const runSeed = async () => {
  try {
    await client.connect();
    const db = drizzle(client, { schema });

    const dbIsDirty = await db.query.users.findFirst();

    if (dbIsDirty != null) {
      runtimeLogger.info('SEED ALREADY IN!');
      return;
    }

    const questions: schema.NewQuestion[] = [];
    for (let i = 0; i < 20; i++) {
      questions.push({
        title: faker.lorem.words({ min: 1, max: 5 }),
        description: faker.lorem.sentences({ min: 1, max: 5 }),
        authorId: Math.round(Math.random() * 19),
      });
    }
    await db.insert(schema.questions).values(questions);

    const answers: schema.NewAnswer[] = [];
    for (let i = 0; i < 20; i++) {
      for (let i = 0; i < Math.random() * 20; i++) {
        answers.push({
          questionId: i,
          answer: faker.lorem.sentences({ min: 1, max: 5 }),
          creatorId: Math.round(Math.random() * 19),
        });
      }
    }
    await db.insert(schema.answers).values(answers);

    await client.end();
  } catch (error) {
    console.error('SOMETHING WENT WRONG', error);
  }
};

runSeed();
