const router = require('express').Router();
const Controllers = require('../controllers/users');

router.get('/get', Controllers.getUsers);
router.get('/search', Controllers.searchUsers);

module.exports = router;
