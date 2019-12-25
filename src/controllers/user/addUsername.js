const User = require('../../models/User');
const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const existingUser = await User.find({ username: req.body.username });
    if (existingUser.length) {
      throw {
        status: 400,
        error: new Error('That username is taken :('),
      };
    }
    let foundUser = await User.findById(user._id);
    foundUser.username = req.body.username;
    foundUser = await foundUser.save();
    successHandler(res, 200, foundUser, null);
  } catch(e) {
    errorHandler(res, e, 'addUsername');
  }
};
