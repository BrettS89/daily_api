const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  time: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, unique: true, required: true },
  photo: { type: String, default: null },
});

module.exports = mongoose.model('Post', postSchema);
