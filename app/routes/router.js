var express = require('express');
var router = express.Router();

//router.use('/db', require('./db.js'));
router.use('/login', require('../constrillers/login'));
router.use('/user' ,require('../constrillers/user'));
router.use('/public', express.static('../public'));
module.exports = router;