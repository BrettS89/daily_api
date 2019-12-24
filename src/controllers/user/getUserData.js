const User = require('../../models/User');
const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const foundUser = await User.findById(user._id);
    if (!foundUser) {
      throw {
        status: 404,
        error: new Error('Could not find user'),
      };
    }
    successHandler(res, 200, foundUser, null);
  } catch(e) {
    errorHandler(res, e, 'getUserData');
  }
};
