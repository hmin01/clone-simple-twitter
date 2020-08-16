var express = require('express');
var router = express.Router();
var connection = require('../mysqldb');
const crypto = require('crypto');
const register = require('../models/usercrud').userRegister;
router.get('/', function (req,res,next) {
    res.render('register');
});

router.post('/',function (req,res,next) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordre = req.body.passwordRe;
    const phonenumber = req.body.phonenumber;
    const gender = req.body.gender;
    const profile = req.body.profile;

    const hashstring = crypto.createHash('sha512').update("CNC").digest('hex');
    const hashSalt = email + hashstring;
    var hashpassword = crypto.createHash('sha512').update(password+hashSalt).digest('hex');
    if(password === passwordre){
        register(name, hashpassword, email,phonenumber,gender,profile, function (err, result, fields) {
            if(err){
                res.send('<script>alert("이미 존재하는 이메일 입니다.");location.href="/register";</script>');
            }else{
                res.send('<script>alert("가입되었습니다");location.href="/login";</script>');
            }
        });
    }else{
        res.send('<script>alert("패스워드가 일치하지 않습니다");location.href="/register";</script>');
    }
});

module.exports = router;
