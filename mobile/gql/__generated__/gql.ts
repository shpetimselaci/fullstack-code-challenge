/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Questions($limit: Int, $offset: Int) {\n    questions(limit: $limit, offset: $offset) {\n      id\n      title\n      description\n      author {\n        id\n        name\n        birthday\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.QuestionsDocument,
    "\n  query UserQuestions($userId: Int!, $limit: Int, $offset: Int) {\n    userQuestions(userId: $userId, limit: $limit, offset: $offset) {\n      id\n      title\n      author {\n        id\n        name\n        birthday\n        createdAt\n        updatedAt\n      }\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.UserQuestionsDocument,
    "\n  query UserAnswers($userId: Int!) {\n    userAnswers(userId: $userId) {\n      id\n      answer\n      question {\n        id\n        title\n        author {\n          birthday\n          name\n          id\n        }\n        description\n      }\n      author {\n        id\n        name\n        birthday\n      }\n      createdAt\n    }\n  }\n": types.UserAnswersDocument,
    "\n  query QuestionAnswers($questionAnswersId: Int!, $offset: Int, $limit: Int) {\n    questionAnswers(id: $questionAnswersId, offset: $offset, limit: $limit) {\n      id\n      answer\n      question {\n        id\n        title\n        description\n        updatedAt\n        createdAt\n      }\n      updatedAt\n      createdAt\n      author {\n        id\n        name\n        birthday\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.QuestionAnswersDocument,
    "\n  query Users($limit: Int, $offset: Int) {\n    users(limit: $limit, offset: $offset) {\n      id\n      name\n      birthday\n      createdAt\n      updatedAt\n    }\n  }\n": types.UsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Questions($limit: Int, $offset: Int) {\n    questions(limit: $limit, offset: $offset) {\n      id\n      title\n      description\n      author {\n        id\n        name\n        birthday\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Questions($limit: Int, $offset: Int) {\n    questions(limit: $limit, offset: $offset) {\n      id\n      title\n      description\n      author {\n        id\n        name\n        birthday\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserQuestions($userId: Int!, $limit: Int, $offset: Int) {\n    userQuestions(userId: $userId, limit: $limit, offset: $offset) {\n      id\n      title\n      author {\n        id\n        name\n        birthday\n        createdAt\n        updatedAt\n      }\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query UserQuestions($userId: Int!, $limit: Int, $offset: Int) {\n    userQuestions(userId: $userId, limit: $limit, offset: $offset) {\n      id\n      title\n      author {\n        id\n        name\n        birthday\n        createdAt\n        updatedAt\n      }\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserAnswers($userId: Int!) {\n    userAnswers(userId: $userId) {\n      id\n      answer\n      question {\n        id\n        title\n        author {\n          birthday\n          name\n          id\n        }\n        description\n      }\n      author {\n        id\n        name\n        birthday\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query UserAnswers($userId: Int!) {\n    userAnswers(userId: $userId) {\n      id\n      answer\n      question {\n        id\n        title\n        author {\n          birthday\n          name\n          id\n        }\n        description\n      }\n      author {\n        id\n        name\n        birthday\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QuestionAnswers($questionAnswersId: Int!, $offset: Int, $limit: Int) {\n    questionAnswers(id: $questionAnswersId, offset: $offset, limit: $limit) {\n      id\n      answer\n      question {\n        id\n        title\n        description\n        updatedAt\n        createdAt\n      }\n      updatedAt\n      createdAt\n      author {\n        id\n        name\n        birthday\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionAnswers($questionAnswersId: Int!, $offset: Int, $limit: Int) {\n    questionAnswers(id: $questionAnswersId, offset: $offset, limit: $limit) {\n      id\n      answer\n      question {\n        id\n        title\n        description\n        updatedAt\n        createdAt\n      }\n      updatedAt\n      createdAt\n      author {\n        id\n        name\n        birthday\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users($limit: Int, $offset: Int) {\n    users(limit: $limit, offset: $offset) {\n      id\n      name\n      birthday\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Users($limit: Int, $offset: Int) {\n    users(limit: $limit, offset: $offset) {\n      id\n      name\n      birthday\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;