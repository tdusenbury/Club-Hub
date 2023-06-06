
const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
  },
  startDate: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
  },
  endDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  eventCreator: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
});

const Event = model('Event', eventSchema);

module.exports = Event;
