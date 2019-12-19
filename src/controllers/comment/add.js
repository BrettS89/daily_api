const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');
const addCommentService = require('../../services/comment/add');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const latestComment = await Comment.find({ userId: user._id })
      .sort({ _id: 'desc' })
      .limit(1);
    addCommentService.checkDate(latestComment);
    const comment = await addCommentService.create(user._id, req.body.post, req.body.text).save();
    const post = await Post.findById(req.body.post);
    post.comments += 1;
    await post.save();
    successHandler(res, 201, comment, null);
  } catch(e) {
    errorHandler(res, e, 'addComment');
  }
};
