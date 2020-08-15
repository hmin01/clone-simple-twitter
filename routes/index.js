var express = require('express');
var router = express.Router();
var connection = require('../mysqldb');
const crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/mainhome', function (req,res,next) {
  if(req.session){
    //console.log("session"+req.session.user.email);
    res.render('mainhome',{email : req.session.user.email });
  }
});

router.post('/mainhome', function (req,res,next) {
  res.redirect('profile');
});

router.get('/register', function (req,res,next) {
  //console.log("session"+req.session.user.email);
  res.render('register');
});

router.post('/register',function (req,res,next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordre = req.body.passwordRe;
  const phonenumber = req.body.phonenumber;
  const gender = req.body.gender;
  const profile = req.body.profile;

  console.log(gender);

  const hashstring1 = crypto.createHash('sha512').update("CNC").digest('hex');
  const hashSalt1 = email + hashstring1;

  var hashpassword = crypto.createHash('sha512').update(password+hashSalt1).digest('hex');

  if(password === passwordre){
    connection.query('INSERT INTO twitterdb.USER VALUES(?,?,?,?,?,?,NOW(),?)',[,name, hashpassword, email,phonenumber,gender,profile], function (err, result, fields) {
      if(err){
        //res.send('<script>alert("이미 존재하는 이메일 입니다.");location.href="/register";</script>');
        res.send(err);
      }else{
        res.send('<script>alert("가입되었습니");location.href="/login";</script>');
        //console.log('성공');
        //res.rdirect('/login');
      }
    });
  }else{
    res.send('<script>alert("패스워드가 일치하지 않습니다");location.href="/register";</script>');
  }
});


router.get('/logout', function(req,res,next){
  req.session.destroy(function(){
    req.session;
  });
  res.redirect('/');
})

router.post('/mainhome', function (req,res,next) {
  res.redirect('profile');
});

router.get('/login', function (req,res,next) {
  //res.render('login');
  let session = req.session;
  res.render("login",{
    session :session
  })
  console.log(req.session);
});

router.post("/login", function(req,res,next) {
  var email = req.body.email;
  var password = req.body.password;

  const hashstring = crypto.createHash('sha512').update("CNC").digest('hex');
  const hashSalt = email + hashstring;
  var hashpassword = crypto.createHash('sha512').update(password+hashSalt).digest('hex');

  connection.query('select * from twitterdb.USER where email =? and password=?', [email, hashpassword], function (err, result, fields) {
    if (err) {
      res.send('err:' + err);
    } else if(result[0] ==null) {

      res.redirect('/login');
    }
    else{
      //console.log(result);
      req.session.user = result[0];
      //console.log("email"+req.session.user.email);
      res.redirect('/mainhome');
    }
  });
});

router.get('/update', function (req,res,next) {
  console.log("update-get");
  var inform = req.session.user;
  res.render('update',inform);
});

router.post('/update', function (req,res,next) {
  console.log("hihi")
  var inform = req.session.user;
  console.log(req.body);
  let body = req.body;
  console.log(body.name);
  connection.query('update twitterdb.USER set name =?, phonenumber=?,gender=?, profile=? where id=?',
      [body.name,body.phonenumber,body.gender,body.profile,req.session.user.id], function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log("변경 완료");
          res.redirect('profile');
        }
      });
  //res.redirect('profile');
});

router.get('/profile', function (req,res,next) {
  console.log('GET');
  var gender;
  var inform = req.session.user;
  connection.query('select * from twitterdb.USER where id=?', [inform.id], function (err, result, fields) {
    if (err) {
      res.send('err:' + err);
    }
    else{
      if(result[0].gender ===1){
        gender = "남자";
      }
      else {
        gender = "여자"
      }
      //console.log(result);
      req.session.user = result[0];
      //console.log("email"+req.session.user.email);
      res.render('profile', {name : result[0].name,
        email  : result[0].email,
        phonenumber: result[0].phonenumber,
        gender : gender,
        profile : result[0].profile,
        registerdate :result[0].registerdate
      });
    }
  });
})

router.post('/profile', function (req,res,next) {
  console.log('post');
  var inform = req.session.user;
  //console.log(req);
  res.redirect('update');
});

router.get('/delete', function (req,res,next) {
  var inform = req.session.user;
  console.log("hihihihi");
  console.log(inform);
  res.render('delete',inform);
});

router.post('/delete', function (req,res,next) {
  var inform = req.session.user;
  var check = false;
  console.log("email"+inform.email);
  console.log("password"+req.body.password);

  const hashstring = crypto.createHash('sha512').update("CNC").digest('hex');
  const hashSalt = inform.email + hashstring;
  var hashpassword = crypto.createHash('sha512').update(req.body.password+hashSalt).digest('hex');

  console.log(hashpassword);
  if(hashpassword === inform.password){

    connection.query('DELETE FROM twitterdb.USER WHERE email = ? ',[inform.email], function (err, result, fields){
      if(err)throw err;
      else {
        res.send('<script>alert("삭제 되었습니다"); location.href="/";</script>');
      }
    })
  }
  else {
    res.send('<script>alert("비밀번호가 일치하지 않습니");location.href="/delete";</script>');
  }

});

module.exports = router;
