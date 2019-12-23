const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');
const Post = require('../../models/Post');
const likePostService = require('../../services/post/like');
const addNotification = require('../../utils/addNotification');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const exists = await likePostService.checkIfExists(user._id, req.body.post);
    if (exists.length) {
      throw {
        status: 400,
        error: new Error('you already liked this post'),
      };
    }
    await likePostService.createLike(user._id, req.body.post).save();
    const post = await Post.findById(req.body.post);
    post.likes += 1;
    await post.save();
    successHandler(res, 200, null, null);
    addNotification('like', post.userId, user._id, req.body.post);
  } catch(e) {
    errorHandler(res, e, 'like');
  }
};
