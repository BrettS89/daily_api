const User = require('../../models/User');
const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const user = await User.findById(_id);
    user.photo = req.query.photo;
    const updatedUser = await user.save();
    console.log(updatedUser);
    successHandler(res, 200, updatedUser, null);
  } catch(e) {
    errorHandler(res, e, 'addProfilePhoto');
  }
};
