var express = require('express');
var router = express.Router();
var connection = require('../mysqldb');
const crypto = require('crypto');
const userdelete = require('../models/usercrud').userDelete;

router.get('/', function (req,res,next) {
    var inform = req.session.user;
    res.render('delete',inform);
});

router.post('/', function (req,res,next) {
    var inform = req.session.user;

    console.log("email"+inform.email);
    console.log("password"+req.body.password);

    const hashstring = crypto.createHash('sha512').update("CNC").digest('hex');
    const hashSalt = inform.email + hashstring;
    var hashpassword = crypto.createHash('sha512').update(req.body.password+hashSalt).digest('hex');

    console.log(hashpassword);
    if(hashpassword === inform.password){
        userdelete(inform.email, function (err, result, fields){
            if(err)throw err;
            else {
                res.send('<script>alert("삭제 되었습니다"); location.href="/";</script>');
            }
        })
    }
    else {
        res.send('<script>alert("비밀번호가 일치하지 않습니다.");location.href="/delete";</script>');
    }

});

module.exports = router;
