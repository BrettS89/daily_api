const mongoose = require('mongoose');
const Post = require('../../models/Post');

exports.getPostsQuery = (userId, offset = 0) => {
  userId = mongoose.Types.ObjectId(userId);
  return Post.aggregate([
    {
      $lookup: {
        from: 'follows',
        let: { 'id': "$userId" },
        pipeline: [
          { $match:
             { $expr:
                { $and:
                   [
                     { $eq: [ "$followee",  "$$id" ] },
                     { $eq: [ "$follower", userId ] }
                   ]
                }
             }
          },
       ],
        as: "followArray",
      },
    },
    {
      $match: { 'followArray': { '$ne': [] } }
    },
    { $sort: { '_id': -1 } },
    { $skip: offset },
    { $limit: 26 },
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
    },
    {
      $lookup:
        {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        }
   },
  ])
};

exports.formatData = posts => {
  return posts.map(p => {
    let post
    const u = p.user[0];
    if (p.likesArr.length) {
      post = {
        ...p,
        liked: true,
      };
    } else {
      post = p;
    }
    delete post.likesArr;
    delete post.user;
    return {
      ...post,
      fullName: u.fullName,
      profilePhoto: u.photo,
    };
  });
};