const User = require('../../models/User');
const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const loginService = require('../../services/user/login');

module.exports = async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        status: 404,
        error: new Error('No user found with this email'),
      };
    }
    const passwordMatch = loginService.checkPassword(password, user.password);
    if (!passwordMatch) {
      throw {
        status: 401,
        error: new Error('incorrect login credentials'),
      };
    }
    const token = registerService.createToken(user._id);
    successHandler(res, 200, null, token);
  } catch(e) {
    errorHandler(res, e, 'login');
  }
};
