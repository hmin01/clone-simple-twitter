var express = require('express');
var router = express.Router();
var userInfoUpdate = require('../models/usercrud').userInfoUpdate;
var connection = require('../connectMysql');

router.get('/', function (req,res,next) {
    console.log("update-get");
    var inform = req.session.user;
    res.render('update',inform);
});

router.post('/', function (req,res,next) {
    console.log("hihi")
    var inform = req.session.user;
    console.log(req.body);
    let body = req.body;
    console.log(body.name);

    userInfoUpdate(body.name,body.phonenumber,body.gender,body.profile,req.session.user.id,function (err,result) {
        if (err) {
            console.log(err);
        } else {
            console.log("변경 완료");
            res.redirect('profile');
        }
    });

});

module.exports = router;
