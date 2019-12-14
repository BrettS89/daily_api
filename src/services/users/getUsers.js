const mongoose = require('mongoose');
const User = require('../../models/User');

exports.getUsersQuery = (userId, offset = 0) => {
  userId = mongoose.Types.ObjectId(userId);
  return User.aggregate([
    { 
      $match: { '_id': { $ne: userId } }
    },
    {
      '$lookup': {
        'from': 'follows',
        'let': { 'id': "$_id" },
        'pipeline': [
          { '$match':
             { '$expr':
                { '$and':
                   [
                     { '$eq': [ "$followee",  "$$id" ] },
                     { '$eq': [ "$follower",  userId ] },
                   ]
                }
             }
          },
       ],
        'as': "followArray",
      },
    },
    {
      '$match': { 'followArray': { '$eq': [] } }
    },
    { '$sort': {
        "_id": -1,
      }
    },
    { $skip: offset },
    { $limit: 12 },
  ])
};
