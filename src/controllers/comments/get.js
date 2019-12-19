const Comment = require('../../models/Comment');
const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    await userAuth(req.header('authorization'));
    const comments = await Comment.find({ postId: req.query.post })
      .sort({ _id: 'desc' })
      .skip(req.query.offset)
      .populate('userId', ['fullName', 'photo'])
      .lean()
    successHandler(res, 200, comments, null);
  } catch(e) {
    errorHandler(res, e, 'getComments');
  }
};
