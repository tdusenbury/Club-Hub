const { AuthenticationError } = require('apollo-server-express');
const { User, Event, UserEvent } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getMembers: async (parent, args, context) => {
      if (context.user) {
        return User.find();
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getMe: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getAllEvents: async (parent, args, context) => {
      if (context.user) {
        return Event.find().populate('User');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getEvent: async (parent, {eventId}, context) => {
      if (context.user) {
        return Event.findOne({ _id: eventId }).populate('User');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getUserEvent: async (parent, args, context) => {
      if (context.user) {
        return UserEvent.find({ userId: context.user._id }).populate('Event');
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
        User.findOneAndUpdate(
          { _id: context.user._id },
          { name: name, phone: phone, email: email, address: address, emergencyContactNumber: emergencyContactNumber, emergencyContactName: emergencyContactName},
          {new : true}
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        // TODO: How to expire token while deleting user
        User.findOneAndDelete(
          { _id: context.user._id },
          {new : true}
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
