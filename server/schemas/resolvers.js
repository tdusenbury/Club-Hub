const { AuthenticationError } = require('apollo-server-express');
const { User, Event, UserEvent } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getMembers: async (parent, args, context) => {
      if (context.user) {
        return await User.find();
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getMe: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getAllEvents: async (parent, args, context) => {
      if (context.user) {
        return await Event.find().populate('User');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getEvent: async (parent, {eventId}, context) => {
      if (context.user) {
        return await Event.findOne({ _id: eventId }).populate('User');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getUserEvent: async (parent, args, context) => {
      if (context.user) {
        return await UserEvent.find({ userId: context.user._id }).populate('Event');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, { name, phone, email, password }) => {
      const user = await User.create({ name, phone, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, { name, phone, email, address, emergencyContactNumber, emergencyContactName}, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { name: name, phone: phone, email: email, address: address, emergencyContactNumber: emergencyContactNumber, emergencyContactName: emergencyContactName},
          {new : true}
        );

        return User;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        // TODO: How to expire token while deleting user
        await User.findOneAndDelete(
          { _id: context.user._id },
          {new : true}
        );

        return User;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createEvent: async (parent, {name, location, startTime, startDate, endTime, endDate, description}, context) => {
      if (context.user) {
        await Event.create(
          {name: name, location: location, startTime: startTime, startDate: startDate, endTime: endTime, endDate: endDate, description: description, eventCreator: context.user._id}
        );

        return Event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateEvent: async (parent, { eventId, name, location, startTime, startDate, endTime, endDate, description}, context) => {
      if (context.user) {
        await Event.findOneAndUpdate(
          { _id: eventId },
          { name: name, location: location, startTime: startTime, startDate: startDate, endTime: endTime, endDate: endDate, description: description},
          {new : true}
        );

        return Event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteEvent: async (parent, {eventId}, context) => {
      if (context.user) {
        await Event.findOneAndDelete(
          { _id: eventId },
          {new : true}
        );

        return Event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
