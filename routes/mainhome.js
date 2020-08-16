var express = require('express');
var router = express.Router();

router.get('/', function (req,res,next) {
    if(req.session){
        res.render('mainhome',{email : req.session.user.email });
    }
});

router.post('/', function (req,res,next) {
    res.redirect('profile');
});

module.exports = router;
