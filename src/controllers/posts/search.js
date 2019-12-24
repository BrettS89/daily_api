const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');
const searchPostsService = require('../../services/posts/search');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    let posts = await searchPostsService.searchQuery(user._id, Number(req.query.offset), req.query.term);
    posts = posts.map(p => {
      return p.followArray.length
        ? { ...p, following: true }
        : p;
    });
    posts = searchPostsService.formatData(posts);
    successHandler(res, 200, posts, null);
  } catch(e) {
    errorHandler(res, e, 'searchPosts');
  }
};
