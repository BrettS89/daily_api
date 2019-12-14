const User = require('../../models/User');

exports.searchQuery = (name, offset = 0) => {
  return User.find(
    { fullName : { '$regex' : name, '$options' : 'i' } },
    ['_id', 'firstName', 'lastName', 'fullName', 'photo'])
  .sort({ _id: -1 })
  .skip(offset)
  .limit(20)
};
