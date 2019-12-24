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
    let post = await addPostService.createPost(req.body).save();
    post = await Post.findById(post._id)
      .populate('userId', ['fullName', 'photo'])
      .lean();
    post.profilePhoto = post.userId.photo;
    post.fullName = post.userId.fullName;
    delete post.userId;
    successHandler(res, 201, post, null);
  } catch(e) {
    errorHandler(res, e, 'addPost');
  }
};
