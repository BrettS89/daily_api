const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');
const Follow = require('../../models/Follow');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    await Follow.remove({ follower: user._id, followee: req.query.id });
    console.log('inn?');
    successHandler(res, 200, null, null);
  } catch(e) {
    errorHandler(res, e, 'follow');
  }
};
