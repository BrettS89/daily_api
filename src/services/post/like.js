const Like = require('../../models/Like');
const mongoose = require('mongoose');

exports.createLike = (userId, postId) => {
  return new Like({
    userId,
    postId,
  });
};

exports.checkIfExists = (userId, postId) => {
  userId = mongoose.Types.ObjectId(userId);
  postId = mongoose.Types.ObjectId(postId);
  return Like.find({
    userId,
    postId,
  });
};
