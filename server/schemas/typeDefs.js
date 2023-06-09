const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    phone: String
    address: String
    emergencyContactNumber: String
    emergencyContactName: String
    events: [Event]
  }
  
  type Event {
    _id: ID
    name: String!
    location: String!
    startTime: String
    startDate: String!
    endTime: String
    endDate: String!
    description: String
    eventCreator: User
    attendingUsers: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getMembers: [User]
    getMe: User
    getEvent(_id:ID!): Event
    getAllEvents: [Event]
    getMyEvents: [Event]
    getAttendingEvents:[Event]
    getFutureEvents: [Event]
    getUserEvent(userID:ID!): [Event]
  }

  type Mutation {
    createUser(name: String!, phone: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(name: String!, phone: String!, address: String, emergencyContactNumber: String, emergencyContactName: String): User
    createEvent(name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String, eventCreator: ID): Event
    updateEvent(eventId:ID!, name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String): Event
    deleteEvent(eventId:ID!): Event
    addUserEvent(eventId: ID!): User
    removeUserEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
