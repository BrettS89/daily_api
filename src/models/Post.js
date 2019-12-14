const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  day: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePhoto: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, default: null },
  photo: { type: String, default: null },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', postSchema);
