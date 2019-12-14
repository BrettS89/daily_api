const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');
const followService = require('../../services/user/follow');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    await followService.createFollow(user._id, req.body.id).save();
    successHandler(res, 201, null, null);
  } catch(e) {
    errorHandler(res, e, 'follow');
  }
};
