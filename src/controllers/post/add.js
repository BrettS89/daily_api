const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');
const addPostService = require('../../services/post/add');
const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    let user = await userAuth(req.header('authorization'));
    req.body.userId = user._id;
    const latestPost = await Post.find({ userId: user._id })
      .sort({ dateCreated: 'desc' })
      .limit(1);

    addPostService.checkDate(latestPost);
    user = await User.findById(user._id);
    req.body.firstName = user.firstName;
    req.body.lastName = user.lastName;
    req.body.profilePhoto = user.photo;
    const post = await addPostService.createPost(req.body).save();
    successHandler(res, 201, post, null);
  } catch(e) {
    errorHandler(res, e, 'addPost');
  }
};
