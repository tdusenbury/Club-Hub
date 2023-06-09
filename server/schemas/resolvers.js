const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
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
        return await User.findOne({ _id: context.user._id }).populate('events');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getAllEvents: async (parent, args, context) => {
      if (context.user) {
        return Event.find().populate('attendingUsers').sort({ startDate: -1 });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getMyEvents: async (parent, args, context) => {
      if (context.user) {
        const currentDate = Date.now();
        const events = await Event.find({ eventCreator: { _id: context.user._id }, endDate: { $gte: currentDate } });
        return events;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getAttendingEvents: async (parent, args, context) => {

      if (context.user) {
        const currentDate = Date.now();
        const attendingEvents = await Event.find({ attendingUsers: { $in: [context.user._id] }, endDate: { $gte: currentDate } });
        return attendingEvents;

      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getFutureEvents: async (parent, args, context) => {
      if (context.user) {
        const currentDate = Date.now();
        const futureEvents = Event.find({ endDate: { $gte: currentDate } }).populate('attendingUsers').sort({ startDate: 1 });

        return futureEvents

      }
      throw new AuthenticationError('You need to be logged in!');

    },
    getEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        return await Event.findOne({ _id: eventId });
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

    updateUser: async (parent, { name, phone, address, emergencyContactNumber, emergencyContactName }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { name: name, phone: phone, address: address, emergencyContactNumber: emergencyContactNumber, emergencyContactName: emergencyContactName },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createEvent: async (parent, { name, location, startTime, startDate, endTime, endDate, description, eventCreator }, context) => {
      if (context.user) {
        const newEvent = await Event.create(
          { name: name, location: location, startTime: startTime, startDate: startDate, endTime: endTime, endDate: endDate, description: description, eventCreator: context.user._id }
        );

        return newEvent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateEvent: async (parent, { eventId, name, location, startTime, startDate, endTime, endDate, description }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { name: name, location: location, startTime: startTime, startDate: startDate, endTime: endTime, endDate: endDate, description: description },
          { new: true }
        );

        return updatedEvent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const deletedEvent = await Event.findOneAndDelete(
          { _id: eventId },
          { new: true }
        );
        await User.updateMany(
          { events: { $in: [eventId] } }, // Filter users who have the event ID in their events array
          { $pull: { events: eventId } } // Pull the event ID from the events array
        )
        return deletedEvent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addUserEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const userId = context.user._id;
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { $addToSet: { attendingUsers: userId } },
          { new: true }
        );
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { events: eventId } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeUserEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { $pull: { attendingUsers: context.user._id } },
          { new: true }
        );
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: eventId } },
          { new: true }
        );
        return updatedEvent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
