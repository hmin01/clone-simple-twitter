var express = require('express');
var router = express.Router();
var imageupload = require('../helper/imageupload');
var filemkdir = require('../helper/imagemkdir').filemkdir();
const query = require('../models/board');

router.get('/', function(req, res, next) {
    query.boardList()
        .then(boardR=>{
            query.selectComment({board_id:req.params.board_id}).then(commentR=>{
                console.log(commentR);
                if(req.session.user !== undefined){
                    res.render('boardlist', {
                        BoardContents : boardR.message,
                        userId :req.session.user.id,
                        comments:commentR.message,
                        name: req.session.user.name
                    });
                }
                else{
                    res.render('boardlist', {
                        boards : boardR.message, userId: 0, comments : commentR.message, name:0
                    });
                }
            }).catch(err=>{
                res.send({message : err});
            })
        }).catch(err=>{
        res.send({message : err});
    })
});

router.post('/comment', function(req,res){
    const commentInfo = {
        b_id: req.body.b_id,
        comment: req.body.comment,
        user_id: req.session.user.id,
        name: req.session.user.name
    }
    query.comment(commentInfo).then(message=>{
        if(message.message.affectedRows ===1){
            res.send({
                user_id : req.session.user.id, comment : req.body.comment,
                name : req.session.user.name , reg_date : req.body.reg_date
            });
        }
    }).catch(err =>{
        throw err;
    })
})

/*
router.post('/deletecomment', function(req,res){
    console.log({comment_id: req.body.comment_id});
    query.deleteComment({comment_id: req.body.comment_id}).then(result=>{
        if(result.message.affectedRows === 1){
            res.send({message: "success"});
        }else{
            res.send({message: "fail"});
        }
    }).catch(err =>{
        throw err;
    })
})
*/




router.get('/board', function (req,res,next) {
    res.render('/');
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
       await query.createContents(boardInfo)
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

router.post('/comment', function(req,res){
    const commentInfo = {
        b_id: req.body.board_id,
        comment: req.body.comment,
        u_id: req.session.user.id,
        name: req.session.user.name
    }
    query.comment(commentInfo).then(message=>{
        if(message.message.affectedRows ===1){
            res.send({user_id : req.session.user.id, comment : req.body.comment,
                name : req.session.user.name , reg_date : req.body.reg_date
            });
        }
    }).catch(err =>{
        throw err;
    })
})


router.get('/update', function (req,res,next) {

});

router.post('/update', (req,res,next)=>{
    const updateInfo ={
        b_id : req.body.b_id,
        contents : req.body.contents
    }
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
