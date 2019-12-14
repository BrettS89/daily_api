const Post = require('../../models/Post');
const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');
const discoverPostsService = require('../../services/posts/discover');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    let posts = await discoverPostsService.getPostsQuery(user._id, Number(req.query.offset));
    posts = posts.map(p => {
      return p.followArray.length
        ? { ...p, following: true }
        : p;
    });
    successHandler(res, 200, posts, null);
  } catch(e) {
    errorHandler(res, e, 'discover');
  }
};
