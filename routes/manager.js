const express = require('express');

// 멀터 모듈 불러오기
const multer = require('multer');
// Filesystem 모듈 불러오기
const fs = require('fs');
const { managerImg, deleteData } = require('../controllers/mainController');

const {
  showConfirm,
  showAccept,
  showAcceptReturn,
} = require('../controllers/managerController');

// 컨트롤러 불러오기
const objectDB = require('../controllers/objectController');

// 파일 업로드 설정
const dir = './uploads';
// 저장 설정
const storage = multer.diskStorage({
  // 업로드를 할 폴더 설정
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  // 파일 이름을 설정
  filename: (req, file, cb) => {
    // const ext = file.originalname.split('.').pop();
    cb(null, file.originalname);
  },
});

// 파일 크기 제한
const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({
  storage,
  limits,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/svg+xml' || // svg 파일 추가
      file.originalname.endsWith('.ico') // ico로 끝나는 파일 허용
    ) {
      cb(null, true);
    } else {
      cb(new Error('올바른 파일 형식이 아닙니다.'));
    }
  },
});

// 서버의 최상단 폴더에 uploads 있는지 확인, 폴더가 없으면 만드는 코드
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// 물품 추가 페이지 불러오기
const router = express.Router();

// manager main 에 img 업로드
router.post('/', upload.single('image'), managerImg);

router.post('/delete/:type', deleteData);

// localhost:4000/manager/confirm/${type}

router.get('/confirm/:type', showConfirm);
router.post('/accept/:code', showAccept);
router.post('/acceptReturn/:code', showAcceptReturn);

module.exports = router;
