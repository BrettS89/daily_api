const router = require('express').Router();
const Controllers = require('../controllers/users');

router.get('/get', Controllers.getUsers);

module.exports = router;
