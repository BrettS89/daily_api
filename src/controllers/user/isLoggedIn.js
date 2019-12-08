const User = require('../../models/User');
const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');
const isLoggedInService = require('../../services/user/isLoggedIn');

exports.isLoggedIn = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const foundUser = await User.findById(user._id);
    if (!foundUser) {
      throw {
        status: 404,
        error: new Error('Could not find user'),
      };
    }
    const updatedUser = await isLoggedInService.updateUser(foundUser).save();
    const data = isLoggedInService.formatResponse(updatedUser);
    successHandler(res, 200, data, null);
  } catch(e) {
    errorHandler(res, e, 'isLoggedIn');
  }
};
