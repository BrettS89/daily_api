const User = require('../../models/User');

exports.getUsersQuery = (userId, offset = 0) => {
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
  ])
  .skip(offset)
  .sort({ 'dateCreated': 'desc' })
  .lean()
};
