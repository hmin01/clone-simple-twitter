var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysqldb');

router.get('/',function (req,res,next) {
    res.render('register');
});

router.post('/',function (req,res,next) {
    var userName = req.body['userName'];
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    var userPwRe = req.body['userPwRe'];
    var userPhone = req.body['userPhone'];
    var userGender = req.body['userGender'];
    var userProfile = req.body['userProfile'];
    //"'INSERT INTO twitter.USER VALUES('"+1 +"', '" +userId +"', '"+userPw+ "', '" +userPhone+"','"
    //             +userGender+"', '"+123+"', '"+userProfile+"')"
    if(userPw === userPwRe){
        mysqlDB.query('INSERT INTO twitterdb.USER VALUES(?,?,?,?,?,?,?,?)',[,userName, userPw, userId,userPhone,userGender,,userProfile], function (err, result, fields) {
            if(err){
                res.send('err:' + err);
            }else{
                res.send('create success:'+'userID:' + userId + ", userPw:" + userPw + ", userPw:" + userPhone + ", userPw:" + userGender + ", userPw:" + userProfile);
            }
        });
    }else{
        res.send('비밀번호가 달라요');
    }
});

module.exports = router;