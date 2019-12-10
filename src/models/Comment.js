const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  time: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
