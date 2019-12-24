const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  day: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, default: null },
  photo: { type: String, default: null },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false },
});

module.exports = mongoose.model('Post', postSchema);
