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


export const GET_ME = gql`
  query getMe {
    getMe {
      name
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
      }
    }
  }
`;



export const QUERY_EVENTS = gql`
  {
    getAllEvents {
    _id
    name
    location
    startTime
    startDate
    endTime
    endDate
    description
    eventCreator{
      _id
    }
  }
  }

`;

export const GET_MEMBERS = gql`
  query getMembers {
    getMembers {
      name
      phone
      email
      emergencyContactNumber
      emergencyContactName
    }
  }
`;
export const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    getEvent(_id: $eventId) {
      _id
      name
      location
      startTime
      startDate
      endTime
      endDate
      description
      eventCreator {
        _id
        name
        email
      }
      attendingUsers {
        _id
        name
        email
      }
    }
}`