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
export const UPDATE_USER = gql`
  mutation updateUser($name: String!, $phone: String!, $address: String, $emergencyContactNumber: String, $emergencyContactName: String) {
    updateUser(name: $name, phone: $phone, address: $address, emergencyContactNumber: $emergencyContactNumber, emergencyContactName: $emergencyContactName ) {
      token
      user {
        name, 
        phone,
        address,
        emergencyContactNumber,
        emergencyContactName
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation createEvent($name:String!, $location: String!, $startTime:String!,$startDate: String!, $endTime:String,$endDate: String!, $description:String! ) {
    createEvent(name:$name, location: $location, startTime: $startTime,startDate: $startDate, endTime:$endTime,endDate: $endDate, description: $description) {
      _id
      name 
      location
      startTime 
      startDate
      endTime 
      endDate
      description 
    }
  }
`;

