var express = require('express');
var router = express.Router();
//var CRUD = require('./CRUD');
var connection= require('../connectMysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
  console.log("home"+req.session);
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

router.get('/login', function (req,res,next) {
    //res.render('login');
    let session = req.session;
    res.render("login",{
        session :session
    })
    console.log(req.session);
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
    var inform = req.session.user;
    connection.query('select * from twitterdb.USER where id=?', [inform.id], function (err, result, fields) {
        if (err) {
            res.send('err:' + err);
        }
        else{
            //console.log(result);
            req.session.user = result[0];
            //console.log("email"+req.session.user.email);
            res.render('profile', {name : result[0].name,
                email  : result[0].email,
                phonenumber: result[0].phonenumber,
                gender : result[0].gender,
                profile : result[0].profile,
                registerdate :result[0].registerdate
            });
        }
    });


})

router.post('/profile', function (req,res,next) {
    console.log('post');
    var inform = req.session.user;
    res.redirect('update');
});

module.exports = router;
