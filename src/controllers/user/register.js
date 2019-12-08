const User = require('../../models/User');
const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const registerService = require('../../services/user/register');

module.exports = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      throw {
        status: 400,
        error: new Error('This email already exists'),
      };
    }
    const hashedPassword = registerService.hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await registerService.createUserInstance(req.body).save();
    const token = registerService.createToken(user._id);
    successHandler(res, 201, null, token);
  } catch(e) {
    errorHandler(res, e, 'register');
  }
};
