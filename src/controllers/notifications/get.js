const Notification = require('../../models/Notification');
const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const notifications = await Notification.find({ userId: user._id })
      .sort({ _id: 'desc' })
      .skip(Number(req.query.offset))
      .limit(50)
      .populate('otherUserId', ['photo']);

    successHandler(res, 200, notifications, null);
  } catch(e) {
    errorHandler(res, e, 'getNotifications');
  }
};
