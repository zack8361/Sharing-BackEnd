const express = require('express');

const multer = require('multer');

const fs = require('fs');
const {
  showMain,
  showMypage,
  showNotice,
  writeNotice,
  postMyImg,
  deleteNotice,
  commonImg,
  deleteNotice,
} = require('../controllers/mainController');

const objectDB = require('../controllers/objectController');

// Filesystem 모듈 불러오기

// 기본 이미지 파일명
const defaultImage = 'mypage_user.png';

// 파일 업로드 설정
const dir = './profile';
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

const router = express.Router();

// localhost:4000/main
router.get('/:id', showMain);

// user_mypage 화면 출력
router.get('/mypage/:id', showMypage);

// notice 페이지 화면 출력
router.get('/manager/notice', showNotice);

// notice 페이지 데이터 추가
router.post('/manager/notice', writeNotice);

// notice 페이지 데이터 삭제
router.post('/manager/notice/:id', deleteNotice);

// mypage 이미지 업로드
router.post('/mypage/:id', upload.single('image'), postMyImg);

// mypage 기본 이미지로 변경
router.post('/mypage/common/:id', commonImg);

// 공지사항 삭제
router.delete('/manager/notice/:code', deleteNotice);

// router.get('/', (req, res) => {
//   objectDB.getAllObjects((data) => {
//     // 컨트롤러에서 받아온 값
//     const OBJECT = data;
//     const objectCounts = OBJECT.length;

//     // 메인 페이지에 값 전달하기
//     res.status(200).json('main', { OBJECT, objectCounts });
//   });
// });

module.exports = router;
