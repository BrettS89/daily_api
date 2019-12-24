const register = require('./register');
const login = require('./login');
const isLoggedIn = require('./isLoggedIn');
const follow = require('./follow');
const unfollow = require('./unfollow');
const addProfilePhoto = require('./addProfilePhoto');

module.exports = {
  login,
  register,
  isLoggedIn,
  follow,
  unfollow,
  addProfilePhoto,
};
