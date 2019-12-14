const mongoose = require('mongoose');
const Post = require('../../models/Post');

exports.getPostsQuery = (userId, offset = 0) => {
  userId = mongoose.Types.ObjectId(userId);
  return Post.aggregate([
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
    // {
    //   '$match': { 'followArray': { '$ne': [] } }
    // },
  ])
    .sort({ _id: 'desc' })
    .skip(offset)
    .limit(20);
};
