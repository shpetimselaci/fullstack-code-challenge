import gql from 'graphql-tag';
import { mutationDefs } from './mutations';

import { queryDefs } from './queries';

import { typeDefs } from './types';

export default gql([...typeDefs, ...queryDefs, ...mutationDefs].join(' '));
