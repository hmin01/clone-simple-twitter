var express = require('express');
var router = express.Router();
var imageupload = require('../helper/imageupload');
var filemkdir = require('../helper/imagemkdir').filemkdir();
const query = require('../models/board');

router.get('/', function(req, res, next) {
    query.search().then(result => {
        res.render('./board/boardlist',{
            boardlist : result.message
        });
    }).catch(err => {
        throw err;
    });

});

router.get('/write', function (req,res,next) {
    res.render('./board/boardwrite');
});


//app.use('/users', express.static('uploads')); 정적파일조회
router.post('/write',imageupload.single('image_path'), (req,res,next)=>{
    //res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file);
    const inform = req.session.user;
    try{
        const boardInfo ={
            contents : req.body.contents,
            image_path : req.file['filename'],
            user_id : inform.id
        }

        query.write(boardInfo)
            .then(result => {
                res.send('<script>alert("글쓰기가 완료되었습니다.");location.href="./";</script>');
        }).catch(err => {
            throw err;
        });
    }catch (e) {
        console.error(e);
    }
});


router.get('/update', function (req,res,next) {

});
router.post('/update', (req,res,next)=>{

});


router.get('/delete', function (req,res,next) {

});
router.post('/delete', (req,res,next)=>{

});
module.exports = router;
