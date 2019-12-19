const Post = require('../../models/Post');
const getIsoDate = require('../../utils/getIsoDate');

exports.createPost = data => {
  return new Post({
    day: getIsoDate(),
    userId: data.userId,
    firstName: data.firstName,
    lastName: data.lastName,
    text: data.text,
    photo: data.photo,
  });
};

exports.checkDate = latestPost => {
  if (!latestPost.length) return;
  if (latestPost[0].day === getIsoDate()) {
    throw {
      error: new Error('You can only post once a day'),
      status: 400,
    };
  }
};
