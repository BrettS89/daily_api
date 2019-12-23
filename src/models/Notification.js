const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otherUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null },
  text: { type: String, required: true },
});

module.exports = mongoose.model('Notification', notificationSchema);
