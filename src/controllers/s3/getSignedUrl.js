const uuid = require('uuid/v1');
const errorHandler = require('../../utils/errorHandler');
const successHandler = require('../../utils/successHandler');
const userAuth = require('../../utils/userAuth');
const s3 = require('../../api/s3');
const keys = require('../../config');

module.exports = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    // create file name
    const key = `${user._id}/${uuid()}.${req.query.filetype}`;
    const url = await s3.getSignedUrl('putObject', {
      Bucket: keys.bucketName,
      Key: key,
      ContentType: 'image/'+ req.query.filetype,
    });
    const data = {
      url,
      key: `https://one24-dev.s3.amazonaws.com/${key}`,
    };
    successHandler(res, 200, data, null);
  } catch(e) {
    errorHandler(res, e, 'getSignedUrl');
  }
};
