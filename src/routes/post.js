const router = require('express').Router();
const Controllers = require('../controllers/post');

router.post('/add', Controllers.addPost);
router.post('/like', Controllers.likePost);

module.exports = router;