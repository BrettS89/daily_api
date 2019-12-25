const register = require('./register');
const login = require('./login');
const isLoggedIn = require('./isLoggedIn');
const follow = require('./follow');
const unfollow = require('./unfollow');
const addProfilePhoto = require('./addProfilePhoto');
const getUserData = require('./getUserData');
const addUsername = require('./addUsername');

module.exports = {
  login,
  register,
  isLoggedIn,
  follow,
  unfollow,
  addProfilePhoto,
  getUserData,
  addUsername,
};
