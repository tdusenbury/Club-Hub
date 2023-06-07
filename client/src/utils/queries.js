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
