var express = require('express');
var router = express.Router();
var imageupload = require('../helper/imageupload');
var filemkdir = require('../helper/imagemkdir').filemkdir();
const query = require('../models/board');

router.get('/', function(req, res, next) {
    query.search().then(result => {
        res.render('./board/boardlist',{
            boardlist : result.message,
            userId : req.session.user.id
        });
    }).catch(err => {
        throw res.json(err);
    });

});

router.get('/write', function (req,res,next) {

});

//app.use('/users', express.static('uploads')); 정적파일조회
router.post('/write',imageupload.single('image_path'), async (req,res,next)=>{
    //res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.files); // undefined
    console.log(req.file);
    try{
        const boardInfo ={
            contentswrite : req.body.contentswrite,
            image_path : (req.file) ? req.file.filename : "",
            user_id : req.session.user.id
        }

       await query.write(boardInfo)
            .then(result => {
                if(result.message.affectedRows === 1){
                    //res.send({message: "success"});
                    res.send('<script>alert("성공");location.href="./";</script>');
                }else{
                    res.send({message: "fail"});
                }
        }).catch(err => {
            throw res.json(err);
        });
    }catch (e) {
        console.error(e);
    }
});


router.get('/update', function (req,res,next) {

});

router.post('/update', (req,res,next)=>{
    const updateInfo ={
        b_id : req.body.b_id,
        contents : req.body.contents
    }

    console.log(updateInfo);

    query.update(updateInfo)
        .then(_result => {
            if(_result.message.affectedRows == 1){
                query.updateselect(updateInfo).then(result => {

                    console.log(result.message[0]);

                    res.send({result: result.message[0]});
                });
            }else{
                res.send({message: "fail"});
            }
        }).catch(err =>{
            res.send({message: err});
    });
});

router.get('/delete', function (req,res,next) {

});

router.post('/delete', (req,res,next)=>{
    const deleteInfo ={
        b_id : req.body.b_id
    }
    query.delete(deleteInfo)
        .then(result => {
            if(result.message.affectedRows === 1){
             res.send({message: "success"});
            }else{
                res.send({message: "fail"});
            }
        }).catch(err =>{
        throw res.json(err);
    });
});

module.exports = router;
