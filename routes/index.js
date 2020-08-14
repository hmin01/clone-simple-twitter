var express = require('express');
var router = express.Router();
//var CRUD = require('./CRUD');
var connection= require('../connectMysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function (req,res,next) {
  res.render('home');
});

router.get('/mainhome', function (req,res,next) {
    res.render('mainhome');
});

router.get('/login', function (req,res,next) {
  res.render('login');
});

// 프로미스 구문으로  --> response 형식으로 했음
// return 해서?
router.post("/login", function(req,res,next) {
    var useremail = req.body.email;
    var userpassword = req.body.password;

    connection.query('select * from twitterdb.USER where email =? and password=?', [useremail, userpassword], function (err, result, fields) {
        if (err) {
            res.send('err:' + err);
        } else if(result[0] ==null) {
            console.log("틀림")
           res.redirect('/login');
        }
        else{
            req.session.user = result;
            res.redirect('/mainhome');
            }
    });
});

module.exports = router;
