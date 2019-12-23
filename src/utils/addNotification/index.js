const User = require('../../models/User');
const Post = require('../../models/Post');
const notificationService = require('./services');

module.exports = async (type, userId, myUserId, postId) => {
  const user = await User.findById(myUserId);
  let postText = null;
  let post = {};

  if (postId) {
    post = await Post.findById(postId);
    postText = post.text;
  }

  const text = notificationService.createText(type, user.fullName, postText);
  await notificationService.createNotification(userId, user._id, postId, text).save();
};
