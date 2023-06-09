import { gql } from '@apollo/client';


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
    attendingUsers{
      _id
    }
  }
  }

`;

export const QUERY_MY_EVENTS = gql`
  {
    getMyEvents {
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


export const QUERY_ATTENDING_EVENTS = gql`
  {
    getAttendingEvents {
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

export const QUERY_FUTURE_EVENTS = gql`
  {
    getFutureEvents {
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
    attendingUsers{
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