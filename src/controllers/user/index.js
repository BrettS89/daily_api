const register = require('./register');
const login = require('./login');
const isLoggedIn = require('./isLoggedIn');
const follow = require('./follow');
const unfollow = require('./unfollow');

module.exports = {
  login,
  register,
  isLoggedIn,
  follow,
  unfollow,
};
