var express = require('express');
var router = express.Router();

var query = require('../models/board');
var image_upload = require('../helper/imageupload');
var mkfile = require('../helper/imagemkdir').file();

router.get('/',function (req, res) {
    query.boardList()
        .then(result=>{
            //console.log(result.message);
            res.render('boardList', {
                BoardContents : result.message,
                userId :req.session.user.id});
        }).catch(err=>{
            //console.log(err);
    })
})
router.post('/',function (req, res) {

})
router.get('/board',function (req,res) {
    res.render('/');
})

router.get('/delete',function (req, res) {
});

router.post('/delete',function (req, res) {
    query.deleteContents({ b_id : req.body.b_id}).then(message => {
        if(message.message.affectedRows === 1){
            res.send({"success" :1})
        }
        else{
            res.send("error");
        }

    }).catch(err => {
        console.log(err);
    });

});


router.get('/create',function (req, res) {
    res.render('create');
})


//single :  fiedname에 명시된 단수 파일을 전달 받는다. --> 파일을 전달 받을건데, writing파일의 이미지 네임을 받는다. :
router.post('/create',image_upload.single('image_path'),function (req, res) {

    const Contents = {
        contents : req.body.contents,
        image_path : (req.file) ? req.file.filename : "",
        user_id : req.session.user.id
    }
    console.log(Contents)
    query.createContents(Contents).then(result =>{
        if(result.message.affectedRows === 1){
            res.send({message:"success"});
        }
        else{
            res.send("err");
        }
    }).catch(err=>{
        throw err;
    })

});


router.post('/update', (req,res,next)=>{

    const updateContents ={
        b_id : req.body.b_id,
        contents : req.body.contents,
    }
    query.updateContents(updateContents).then(message => {

        if(message.message.affectedRows === 1){
            query.updateContentsBoard({b_id : req.body.b_id }).then(result =>{
                console.log(result.message[0]);
                res.send(result.message[0])
            })
        }
        }).catch(err =>{
        throw err;
    });


});

module.exports = router;