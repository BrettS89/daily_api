const Notification = require('../../models/Notification');

exports.createText = (type, userName, postText = null) => {
  if (postText) {
    var limitedText = postText.slice(0, 37)
    limitedText = limitedText.length < postText
      ? `${limitedText}...`
      : limitedText;
  }
  
  if (type === 'follow') {
    return `${userName} started following you`;
  } else if (type === 'comment') {
    return `${userName} commented on your post: ${limitedText}`
  } else if (type === 'like') {
    return `${userName} liked your post: ${limitedText}`
  }

  throw {
    status: 500,
    error: new Error('Must provide type of notification'),
  }
};

exports.createNotification = (userId, otherUserId, postId, text) => {
  return new Notification({
    userId,
    otherUserId,
    postId,
    text,
  });
}
