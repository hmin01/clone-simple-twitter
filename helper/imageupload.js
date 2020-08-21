var multer = require('multer');
var path = require('path');
//파일이나 이미지 올리는 것
const upload = multer({
        storage: multer.diskStorage({ //multer모듈 적용 -for 파일 업로드 diskStorage : 저장된 파일 위치 - 디스크 스토리지 엔진은 파일을 디스크에 저장하기 위한 모든 기능 제어
            destination:(req, file, cb)=>{ //저장된 폴더 - 저장할 폴더 위치 설정
                cb(null,'uploads'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
            },
            filename:(req,file,cb)=>{ //파일이름을 정해
                const ext = path.extname(file.originalname); //orignalname은 원래 파일 이
                cb(null,path.basename(file.originalname,ext)+Date.now() + ext); // cb 콜백함수를 통해 전송된 파일 이름 설정
            },
        }),
    }
)

module.exports = upload;
