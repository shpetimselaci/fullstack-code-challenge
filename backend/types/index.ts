// Return all the users. (No need for other user endpoints, just create a sample set of users locally or in the db if you choose one)
// Create a new Question
// Edit a Question
// Delete a Question
// Create a user Answer
// Edit a user Answer
// Delete a user Answer
// Return all the answers of a user

import gql from 'graphql-tag';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const currentDirPath = path.resolve(__dirname, './');

const files = readdirSync(currentDirPath).map((file) =>
  file.endsWith('.ts')
    ? ''
    : readFileSync(path.resolve(currentDirPath, file), {
        encoding: 'utf-8',
      }),
);

const typeDefs = gql(files);

export default typeDefs;
