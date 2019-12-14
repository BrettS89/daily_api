const successHandler = require('../../utils/successHandler');
const errorHandler = require('../../utils/errorHandler');
const userAuth = require('../../utils/userAuth');
const searchUsersService = require('../../services/users/search');

module.exports = async (req, res) => {
  try {
    await userAuth(req.header('authorization'));
    const users = await searchUsersService.searchQuery(req.query.name, Number(req.query.offset));
    successHandler(res, 200, users, null);
  } catch(e) {
    errorHandler(res, e, 'searchUsers');
  }
};
