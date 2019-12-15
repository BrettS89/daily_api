const router = require('express').Router();
const Controllers = require('../controllers/posts');

router.get('/get', Controllers.getPosts);
router.get('/discover', Controllers.discover);
router.get('/search', Controllers.search);

module.exports = router;
