const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');
const followService = require('../../services/user/follow');
const addNotification = require('../../utils/addNotification');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    await followService.createFollow(user._id, req.body.id).save();
    successHandler(res, 201, null, null);
    addNotification('follow', req.body.id, user._id, null);
  } catch(e) {
    errorHandler(res, e, 'follow');
  }
};
