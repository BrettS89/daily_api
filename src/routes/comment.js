const router = require('express').Router();
const Controllers = require('../controllers/comment');

router.post('/add', Controllers.addComment);

module.exports = router;
