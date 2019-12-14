const Follow = require('../../models/Follow');

exports.createFollow = (follower, followee) => {
  return new Follow({
    follower,
    followee,
  });
};
