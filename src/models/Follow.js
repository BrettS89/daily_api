const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  follower: { type: String, required: true },
  followee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Follow', followSchema);
