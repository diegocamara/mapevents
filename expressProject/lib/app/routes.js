var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.post('/insertuserpost/', controllers.insertUserPost);

module.exports = router;
