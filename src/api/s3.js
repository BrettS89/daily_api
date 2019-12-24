const AWS = require('aws-sdk');
const keys = require('../config');

module.exports = new AWS.S3({
  accessKeyId: keys.s3AccessKeyId,
  secretAccessKey: keys.s3SecretAccessKey,
});
