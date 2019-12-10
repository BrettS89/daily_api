const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config');
const Follow = require('../../models/Follow');

exports.hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

exports.createUserInstance = ({ email, password, firstName, lastName }) => {
  return new User({
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email,
    password,
  });
};

exports.createToken = _id => {
  return jwt.sign({ _id }, keys.jwtSecret);
};

exports.followSelf = _id => {
  return new Follow({
    follower: _id,
    followee: _id,
  });
};
