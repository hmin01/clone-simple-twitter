var express = require('express');
var router = express.Router();
var query = require('../models/user');
var hash = require('../hash').hashValue;

/* GET users listing. */
router.get('/', (req, res) => {
  //res.send('respond with a resource');
  res.render('home');
});
router.get('/mainhome',(req,res)=>{
  console.log(req.session);
  if(req.session !== null){
    res.render('mainhome',{ email : req.session.user.email });
  }
})

router.post('/mainhome',(req, res)=>{
  res.redirect('./profile');
})

/* User profile page */
router.get('/profile', (req, res) => {
  //res.send(req.method + " " + req.originalUrl);
  console.log('GET');
  var gender;
  var inform = req.session.user;
  //console.log(inform);

  if(inform.gender ===1){
    gender = "남자";
  }
  else {
    gender = "여자"
  }
  console.log(inform);

  res.render('profile',inform[0]);

});

router.post('/profile',(req, res)=>{
  console.log('post');
  var inform = req.session.user;
  res.redirect('./update');
})

/* Detele user api */
router.delete('/', (req, res) => {
  res.send(req.method + " " + req.originalUrl);
});

/* Login */
router.get('/login', (req, res) => {
  //res.send(req.method + " " + req.originalUrl);
  let session = req.session;
  res.render("login",{
    session :session
  })
  console.log(req.session);

});

/* Login api */
router.post('/login', (req, res) => {
  //res.send(req.method + " " + req.originalUrl);
  const password = req.body.password;
  const email= req.body.email;
  var userInfo = {
    email : req.body.email,
    password: hash(email,password)
  }

  query.login(userInfo)
      .then(rows=>{
        console.log(rows.message);
        if(rows.message.length === 0){
          res.send('<script>alert("비밀번호가 일치하지 않습니다.");location.href="login";</script>');
        }
        else {
          req.session.user = rows.message;
          res.redirect('./mainhome');
        }
      }).catch(err =>{
    throw  err;
  })
});


router.get('/update',(req,res)=>{
  var inform = req.session.user;
  //console.log(inform);
  res.render('update',inform[0]);
})

router.post('/update',(req,res)=>{

  var inform = req.session.user[0];
  let body = req.body;
  console.log(inform[0]);
  //console.log(req.body);

  userInfo = {
    name : body.name,
    phonenumber: body.phonenumber,
    gender : body.gender,
    profile : body.profile,
    id : inform.id
  }

  query.update(userInfo)
      .then(result=>{
        //console.log(rows);
        //req.session.user[0] = userInfo;
        req.session.user[0].name = userInfo.name;
        req.session.user[0].phonenumber = userInfo.phonenumber;
        req.session.user[0].gender = userInfo.gender;
        req.session.user[0].profile = userInfo.profile;
        console.log("변경 완료");
        res.redirect('./profile');
      }).catch(err =>{
    throw  err;
  });

})
module.exports = router;