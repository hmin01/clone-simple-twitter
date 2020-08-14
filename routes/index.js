var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysqldb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.render('main');
});

router.get('/login',function (req,res,next) {
  console.log(req.body);
  res.render('login',{});
});

router.post('/login',function (req,res,next) {
  userId = req.body.userId;
  userPw = req.body.userPw;
  mysqlDB.query('select * from twitterdb.USER where email =? and password=?',[userId, userPw], function (err, result, fields) {
    if (err) {
      res.send('err:' + err);
    } else if(result[0] ==null) {
      console.log("틀림")
      res.redirect('/login');
    }
    else{
      res.redirect('/main');
    }
  });
});

router.get('/main',function (req,res,next) {
  res.render('main',{});
});

router.post('/main',function (req,res,next) {
  console.log(req.body);
  res.json({ok:true});
});
module.exports = router;
