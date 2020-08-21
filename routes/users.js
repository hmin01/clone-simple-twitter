var express = require('express');
var router = express.Router();
var query = require('../models/user');
var hash = require('../helper/hash').hashValue;

/* GET users listing. */
router.get('/', (req, res) => {
  //res.send('respond with a resource');
    res.render('../views/home');
});

/*
router.get('/mainhome', (req, res) => {
  console.log(11111);
  console.log(req.session.user.email);
  //res.render('../views/home');
  //res.render('mainhome');
  if(req.session.user !== null) {
    res.render('../views/mainhome', {email: req.session.user.email})
  }
  else{
    res.render('../views/login');
  }
});
*/

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
});

/* Login Page */
router.get('/login', (req, res) => {
  res.render("login", {
    session: req.session
  });
});
  
/* Login api */
router.post('/login', (req, res) => {
  var userInfo = {
    email : req.body.email,
    password: hash(req.body.email,req.body.password)
  }
  query.login(userInfo).then(rows=>{
    if(rows.message.length !== 0){
      req.session.user = rows.message[0];
      res.send({"sucess" :1});
    }
    else{
      res.send("err");
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
  query.delete(userInfo).then(message => {
    if(message.message.affectedRows === 1){
      res.send('<script>alert("삭제 되었습니다"); location.href="/";</script>');
    }
   else{
      res.send('<script>alert("비밀번호가 일치하지 않습니다.");location.href="./delete";</script>');
    }
  }).catch(err => {
    throw err;
  });

});

router.get('/update',(req,res)=>{
  res.render('update',req.session.user);
});

router.post('/update',(req,res)=>{
  console.log(req);
  const userInfo = {
    name : req.body.name,
    phonenumber: req.body.phonenumber,
    gender : req.body.gender,
    profile : req.body.profile,
    id : req.session.user.id
  }
  query.update(userInfo).then(result=>{
      req.session.user.name = userInfo.name;
      req.session.user.phonenumber = userInfo.phonenumber;
      req.session.user.profile = userInfo.profile;
      res.send('<script>alert("성공!");location.href="./profile";</script>');
  }).catch(err =>{
    console.log(err);
  });
});

module.exports = router;