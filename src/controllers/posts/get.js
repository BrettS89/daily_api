const Post = require('../../models/Post');
const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');
const getPostsService = require('../../services/posts/get');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    let posts = await getPostsService.getPostsQuery(user._id, Number(req.query.offset));
    posts = getPostsService.formatData(posts);
    successHandler(res, 200, posts, null);
  } catch(e) {
    errorHandler(res, e, 'getPosts');
  }
};
