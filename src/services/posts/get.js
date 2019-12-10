const Post = require('../../models/Post');

exports.getPostsQuery = (userId, offset = 0) => {
  return Post.aggregate([
    {
      '$lookup': {
        'from': 'follows',
        'let': { 'id': "$_id" },
        'pipeline': [
          { '$match':
             { '$expr':
                { '$and':
                   [
                    //  { '$eq': [ "$huntId",  "$$id" ] },
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
      '$match': { 'followArray': { '$ne': [] } }
    },
  ])
    .sort({ dateCreated: 'desc' })
    .skip(offset)
    .limit(20);
};
