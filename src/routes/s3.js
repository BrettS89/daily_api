const router = require('express').Router();
const Controllers = require('../controllers/s3');

router.get('/signedurl', Controllers.getSignedUrl);

module.exports = router;
