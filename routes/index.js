var express = require('express');
var router = express.Router();
var connection = require('../mysqldb');
const crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;
