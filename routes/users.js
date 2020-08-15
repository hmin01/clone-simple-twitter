var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
    //res.render('index', { title: 'Express' });
});

router.get('/mainhome', function (req,res,next) {
  res.render('mainhome');
});

router.get('/update', function (req,res,next) {
  res.render('update');
});

router.post("/update", async function(req,res,next){

});

/*
router.post("/views/home", function(req,res,next){
    let userLogin= req.body.email; // 입력값 가져오기
    console.log(req.body.email);

    /*
    User.findAll({
        attributes:['id','email','password'],
        where:{}
    })

});*/

module.exports = router;
