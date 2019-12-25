const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  username: { type: String, default: null },
  lastLogin: { type: Date, default: new Date() },
  photo: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  logins: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
