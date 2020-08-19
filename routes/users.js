var express = require('express');
var router = express.Router();
var hash = require('../models/hash').hashValue;
var query = require('../models/user');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

/* Registration page */
router.get('/register', (req, res) => {
  res.render('register');
  //res.send(req.method + " " + req.originalUrl);
});

/* Register user api */
router.post('/register', (req, res) => {
  const hashpassword = hash(req.body.email,req.body.password);

  const userInfo = {
    name : req.body.name,
    email : req.body.email,
    password : hashpassword,
    phonenumber : req.body.phonenumber,
    gender : req.body.gender
  }
    query.register(userInfo)
        .then(result => {
            res.send('<script>alert("가입되었습니다");location.href="./login";</script>');
        }).catch(err => {
          res.send('<script>alert("이미 존재하는 이메일 입니다.");location.href="./register";</script>');
    })
});

/* Delete page */
router.get('/delete', function (req,res,next) {
  var inform = req.session.user;
  res.render('delete',inform);
});

/* Delete user api */
router.post('/delete', function (req,res,next) {

  const hashpassword  = hash(req.session.user.email,req.body.password);

  const userInfo = {
    email : req.session.user.email,
    password : hashpassword,
  }
  query.delete((userInfo))
      .then(result => {
        res.send('<script>alert("삭제 되었습니다"); location.href="./home";</script>');
      }).catch(err => {
        res.send('<script>alert("비밀번호가 일치하지 않습니다.");location.href="./delete";</script>');
      });
});

/* Login */
router.get('/login', (req, res) => {
  //res.send(req.method + " " + req.originalUrl);
});

/* Login api */
router.post('/login', (req, res) => {
  //res.send(req.method + " " + req.originalUrl);
});

/* profile */
router.get('/profile', (req, res) => {
  //res.send(req.method + " " + req.originalUrl);
});

/* profile api */
router.post('/profile', (req, res) => {
  //res.send(req.method + " " + req.originalUrl);
});


module.exports = router;