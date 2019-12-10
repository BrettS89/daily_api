const router = require('express').Router();
const Controllers = require('../controllers/posts');

router.get('/get', Controllers.getPosts);

module.exports = router;
