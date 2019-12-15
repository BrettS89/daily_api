const mongoose = require('mongoose');
const Post = require('../../models/Post');

exports.searchQuery = (userId, offset = 0, term) => {
  userId = mongoose.Types.ObjectId(userId);
  return Post.aggregate([
    { $match: { $text: { $search:  term } } },
    { $sort: { 'likes': -1 } },
    { $skip: offset },
    { $limit: 20 },
    {
      '$lookup': {
        'from': 'follows',
        'let': { 'id': "$userId" },
        'pipeline': [
          { '$match':
             { '$expr':
                { '$and':
                   [
                     { '$eq': [ "$followee",  "$$id" ] },
                     { '$eq': [ "$follower", userId ] }
                   ]
                }
             }
          },
       ],
        'as': "followArray",
      },
    },
  ])
};
