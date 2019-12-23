const router = require('express').Router();
const Controllers = require('../controllers/notifications');

router.get('/get', Controllers.getNotifications);

module.exports = router;
