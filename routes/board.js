var express = require('express');
var router = express.Router();

var query = require('../models/board');
var image_upload = require('../helper/imageupload');
var mkfile = require('../helper/imagemkdir').file();

router.get('/',function (req, res) {
    query.boardList()
        .then(result=>{
            console.log(result.message);
            res.render('boardList', {
                BoardContents : result.message,
                userId :req.session.user.id});
        }).catch(err=>{
            console.log(err);
    })
})
router.post('/',function (req, res) {

})
router.get('/delete',function (req, res) {
    console.log(req.body);
});

router.get('/create',function (req, res) {
    res.render('createboard');
})

//single :  fiedname에 명시된 단수 파일을 전달 받는다. --> 파일을 전달 받을건데, writing파일의 이미지 네임을 받는다. :
router.post('/create',image_upload.single('image_path'),function (req, res) {

    const Contents = {
        contents : req.body.contents,
        image_path : req.file['filename'],
        user_id : req.session.user.id
    }
    query.createContents(Contents).then(result =>{
        res.send('<script>alert("글쓰기 완료");location.href="./";</script>')
    }).catch(err=>{
        throw err;
    })

})

module.exports = router;