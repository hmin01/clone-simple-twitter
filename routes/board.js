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
    res.json({
        b_id : req.params.b_id
    })
});

router.post('/delete',function (req, res) {

    query.deleteContents({ b_id : req.body.b_id}).then(message => {
       //console.log(message.message);
        //확인해볼것
        //res.send('<script>alert(삭제");location.replace();</script>')
        res.redirect('back');

    }).catch(err => {
        console.log(err);
    });

});

router.get('/create',function (req, res) {
    res.render('create');
})

//single :  fiedname에 명시된 단수 파일을 전달 받는다. --> 파일을 전달 받을건데, writing파일의 이미지 네임을 받는다. :
router.post('/create',image_upload.single('image_path'),function (req, res) {
    //console.log(req.file['filename']);
    const Contents = {
        contents : req.body.contents,
        image_path : (req.file) ? req.file.filename : "",
        user_id : req.session.user.id
    }
    console.log(Contents)
    query.createContents(Contents).then(result =>{
        res.send('<script>alert("글쓰기 완료");location.href="./";</script>')
    }).catch(err=>{
        throw err;
    })

});

router.get('/update', function (req,res,next) {
    res.json({
        b_id : req.params.b_id,
        contents : req.params.contents
    })
});

router.post('/update', (req,res,next)=>{

    const updateContents ={
        b_id : req.body.b_id,
        contents : req.body.contents,
    }
    query.updateContents(updateContents)
        .then(result => {
            res.send('<script>alert("글쓰기가 수정되었습니다.");location.reload();</script>');
        }).catch(err =>{
        throw err;
    });

});

module.exports = router;