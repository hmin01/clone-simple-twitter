var express = require('express');
var router = express.Router();
var userLogin = require('../models/usercrud').userLogin;

router.get('/', function (req,res,next) {
    let session = req.session;
    res.render("login",{
        session :session
    })
    console.log(req.session);
});

router.post("/", function(req,res,next) {
    var email = req.body.email;
    var password = req.body.password;

    userLogin(email,password,function (err,result) {
        if (err) {
            res.send('err:' + err);
        } else if(result[0] ==null) {
            res.redirect('/login');
        }
        else{
            req.session.user = result[0];
            res.redirect('/mainhome');
        }
    });
});
module.exports = router;
