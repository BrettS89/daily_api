const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  lastLogin: { type: Date, default: new Date() },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  logins: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
