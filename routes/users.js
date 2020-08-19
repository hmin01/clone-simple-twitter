var express = require('express');
var router = express.Router();
var query = require('../models/user');
var hash = require('../models/hash').hashValue;

/* GET users listing. */
router.get('/', (req, res) => {
  //res.send('respond with a resource');
  res.render('home');
});

router.get('/mainhome',(req,res)=>{
  if(req.session !== null){
    res.render('mainhome',{ email : req.session.user.email });
  }
});

router.post('/mainhome',(req, res)=>{
  res.redirect('./profile');
});

/* User profile page */
router.get('/profile', (req, res) => {
  var inform = req.session.user;
  res.render('profile',inform);
});

router.post('/profile',(req, res)=>{
    res.redirect('./update');
})

/* Login Page */
router.get('/login', (req, res) => {
  let inform = req.session;
  res.render("login",{
    session : inform
})
  
/* Login api */
router.post('/login', (req, res) => {
  var userInfo = {
    email : req.body.email,
    password: hash(req.body.email,req.body.password)
  }
  
  query.login(userInfo).then(rows=>{
    if(rows.message.length === 0){
      res.send('<script>alert("비밀번호가 일치하지 않습니다.");location.href="login";</script>');
    } else {
      req.session.user = rows.message[0];
      res.redirect('./mainhome');
    }
  }).catch(err =>{
    throw  err;
  });
});

/* Registration page */
router.get('/register', (req, res) => {
  res.render('register');
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
  
  query.register(userInfo).then(result => {
    res.send('<script>alert("가입되었습니다");location.href="./login";</script>');
  }).catch(err => {
    res.send('<script>alert("이미 존재하는 이메일 입니다.");location.href="./register";</script>');
  });
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
  
  query.delete((userInfo)).then(result => {
    res.send('<script>alert("삭제 되었습니다"); location.href="./home";</script>');
  }).catch(err => {
    res.send('<script>alert("비밀번호가 일치하지 않습니다.");location.href="./delete";</script>');
  });
});

router.get('/update',(req,res)=>{
  res.render('update',req.session.user);
});

router.post('/update',(req,res)=>{
  userInfo = {
    name : req.body.name,
    phonenumber: req.body.phonenumber,
    gender : req.body.gender,
    profile : req.body.profile,
    id : req.session.user.id
  }
  
  query.update(userInfo).then(result=>{
    if(result.result == true) {
      req.session.user.name = userInfo.name;
      req.session.user.phonenumber = userInfo.phonenumber;
      req.session.user.profile = userInfo.profile;
      res.send('<script>alert("성공!");location.href="./profile";</script>');
    } else {
      res.send('<script>alert("실패했습니다");location.href="./profile";</script>');
    }
  }).catch(err =>{
    throw err;
  });
});

module.exports = router;