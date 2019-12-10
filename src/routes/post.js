const router = require('express').Router();
const Controllers = require('../controllers/post');

router.post('/add', Controllers.addPost);

module.exports = router;