import { gql } from "@/gql/__generated__";

export const ADD_ANSWER = gql(`
  mutation AddAnswer($questionId: Int!, $answer: String!) {
    addAnswer(questionId: $questionId, answer: $answer) {
      id
      answer
      author {
        birthday
        name
        id
        createdAt
        updatedAt
      }
      question {
        id
        title
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`);

export const EDIT_ANSWER = gql(`
  mutation EditAnswer($answerId: Int!, $answer: String!) {
    editAnswer(answerId: $answerId, answer: $answer) {
      id
      answer
      question {
        id
        title
        description
        createdAt
        updatedAt
      }
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
`);

export const DELETE_ANSWER = gql(`
  mutation DeleteAnswer($answerId: Int!) {
   deleteAnswer(answerId: $answerId) {
      id
      answer
      question {
        id
        title
        description
        createdAt
        updatedAt
      }
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
`);

export const ADD_QUESTION = gql(`
  mutation AddQuestion($title: String!, $description: String!) {
    addQuestion(title: $title, description: $description) {
      id
      title
      description
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`);

export const EDIT_QUESTION = gql(`
  mutation EditQuestion(
    $questionId: Int!
    $title: String!
    $description: String!
  ) {
    editQuestion(
      questionId: $questionId
      title: $title
      description: $description
    ) {
      id
      title
      description
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`);

export const DELETE_QUESTION = gql(`
  mutation DeleteQuestion($questionId: Int!) {
    deleteQuestion(questionId: $questionId) {
      id
      title
      description
      author {
        id
        name
        birthday
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`);
