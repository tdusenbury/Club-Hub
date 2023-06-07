import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }
//   }
// `;



export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      phone
      address
      emergencyContactNumber
      emergencyContactName
      events {
        _id
        name
        location
        startTime
        startDate
        endTime
        endDate
        description
        eventCreator
      }
    }
  }
`;


export const QUERY_EVENTS = gql`
  query getAllEvents {
    getAllEvents {
      _id
      name
      location
      startTime
      startDate
      endTime
      endDate
      description
      eventCreator
    }
  }
`;