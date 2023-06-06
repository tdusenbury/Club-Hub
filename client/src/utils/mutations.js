import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $phone: String!, $email: String!, $password: String!) {
    createUser(name: $name, phone: $phone, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

