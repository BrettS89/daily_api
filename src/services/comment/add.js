const Comment = require('../../models/Comment');
const getIsoDate = require('../../utils/getIsoDate');

exports.create = (userId, postId, text) => {
  return new Comment({
    day: getIsoDate(),
    userId,
    postId,
    text,
  });
};

exports.checkDate = latestComment => {
  if (!latestComment.length) return;
  if (latestComment[0].day === getIsoDate()) {
    throw {
      error: new Error('You can only comment once a day'),
      status: 400,
    };
  }
};
