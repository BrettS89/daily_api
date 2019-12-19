const router = require('express').Router();
const Controllers = require('../controllers/comments');

router.get('/get', Controllers.getComments);

module.exports = router;
