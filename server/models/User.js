const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// const eventSchema = require('./Event');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  phone: {
    type: String,
    match: [/^\+?[1-9][0-9]{7,14}$/, 'Must match a phone number'],
  },
  address: {
    type: String,
  },
  emergencyContactNumber: {
    type: String,
    match: [/^\+?[1-9][0-9]{7,14}$/, 'Must match a phone number'],
  },
  emergencyContactName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;