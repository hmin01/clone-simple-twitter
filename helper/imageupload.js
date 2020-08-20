const path = require('path');
const multer = require('multer');

const upload = multer({
        storage: multer.diskStorage({ //multer모듈 적용 -for 파일 업로드
            destination:(req, file, cb)=>{
                cb(null,'uploads/'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
            },
            filename:(req,file,cb)=>{
                const ext = path.extname(file.originalname);
                cb(null,path.basename(file.originalname,ext)+Date.now() + ext); // cb 콜백함수를 통해 전송된 파일 이름 설정
                //cb(null,file.originalname + Date.now());
            },
        }),
    }
)

module.exports = upload;