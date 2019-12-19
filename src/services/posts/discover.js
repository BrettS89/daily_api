const mongoose = require('mongoose');
const Post = require('../../models/Post');

exports.getPostsQuery = (userId, offset = 0) => {
  userId = mongoose.Types.ObjectId(userId);
  return Post.aggregate([
    { $sort: { '_id': -1 } },
    { $skip: offset },
    { $limit: 6 },
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
    {
      $lookup:
         {
           from: "likes",
           let: { id: "$_id" },
           pipeline: [
              { $match:
                 { $expr:
                    { $and:
                       [
                         { $eq: [ "$postId",  "$$id" ] },
                         { $eq: [ "$userId", userId ] }
                       ]
                    }
                 }
              },
           ],
           as: "likesArr"
         }
    }
  ])
};

exports.setIfLiked = posts => {
  return posts.map(p => {
    if (p.likesArr.length) {
      return {
        ...p,
        liked: true,
      };
    }
    return p;
  });
};
