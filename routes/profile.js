var express = require('express');
var router = express.Router();
const profile = require('../models/usercrud').userInfoProfile;

router.get('/', function (req,res,next) {
    console.log('GET');
    var gender;
    var inform = req.session.user;

    profile(inform.id,function (err,result){
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

router.post('/', function (req,res,next) {
    console.log('post');
    var inform = req.session.user;
    //console.log(req);
    res.redirect('update');
});

module.exports = router;
