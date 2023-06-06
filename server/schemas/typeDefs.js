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
    getUserEvent(userID:ID!): [Event]
  }

  type Mutation {
    createUser(name: String!, phone: String!, email: String!, password: String!,): Auth
    login(email: String!, password: String!): Auth
    updateUser(name: String, phone: String, email: String, address: String, emergencyContactNumber: String, emergencyContactName: String): User
    deleteUser: User
    createEvent(name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String, eventCreator: ID!): Event
    updateEvent(eventId:ID!, name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String, eventCreator: ID!): Event
    deleteEvent(eventId:ID!, name:String!, location: String!, startTime: String, startDate: String!, endTime: String, endDate: String!, description: String, eventCreator: ID!): Event
    addUserEvent(eventId: ID!, userId: ID!): UserEvent
    removeUserEvent(eventId: ID!, userId: ID!): UserEvent
  }
`;
// TODO: what if i have a many to many relationship in mongoose and i need to update both of Event and User (line 48 + 49)

module.exports = typeDefs;
