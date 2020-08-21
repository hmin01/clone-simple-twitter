const fs = require('fs');
//이미지를 저장할 폴더를 없으면 성생함.
module.exports ={
    filemkdir:() => {
        fs.readdir('uploads',(error) =>{
            if(error){
                console.error('uploades 폴더가 없어 uploads 폴더를 생성합니다.');
                fs.mkdirSync('uploads');
            }
        });
    }
};
