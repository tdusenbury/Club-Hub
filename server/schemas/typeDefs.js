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
  type UserEvent {
    _id; ID!
    user: User!
    event: Event!
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
    getUserEvent(_id:ID!): Event
  }

  type Mutation {
    createUser(name: String!, phone: String!, email: String!, password: String!,): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id:ID!, name: String, phone: String, email: String, password: String, address: String, emergencyContactNumber: String, emergencyContactName: String): User
    deleteUser(_id:ID!): User
    createEvent(name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String, eventCreator: ID!): Event
    updateEvent(_id:ID!, name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String, eventCreator: ID!): Event
    deleteEvent(_id:ID!, name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String, eventCreator: ID!): Event
    addUserEvent(eventId: ID!, userId: ID!): UserEvent
    removeUserEvent(eventId: ID!, userId: ID!): UserEvent
  }
`;
// what if i have a many to many relationship in mongoose and i need to update both of Event and User (line 48 + 49)

module.exports = typeDefs;
