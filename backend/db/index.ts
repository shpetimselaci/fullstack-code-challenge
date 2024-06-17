import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import config from '../config';

const pool = new Pool(config.db);

const db = drizzle(pool);

export default db;
