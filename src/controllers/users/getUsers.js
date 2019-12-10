const User = require('../../models/User');
const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');
const getUsersService = require('../../services/users/getUsers');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const users = await getUsersService.getUsersQuery(user._id, req.query.offset);
    successHandler(res, 200, users, null);
  } catch(e) {
    errorHandler(res, e, 'getUsers');
  }
};
