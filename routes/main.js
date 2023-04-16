const express = require('express');
const {
  showMain,
  showMypage,
  showNotice,
  writeNotice,
} = require('../controllers/mainController');

const router = express.Router();

// const isLogin = (req, res, next) => {

//   if (req.session.login) {
//     next();
//   } else {
//     res.send(
//       "<script>alert('로그인 해주세요'); window.location.replace('/login');</script>",
//     );
//   }
// };

// user_main 화면 출력

// localhost:4000/main
router.get('/:id', showMain);

// user_mypage 화면 출력
router.get('/mypage/:id', showMypage);
const objectDB = require('../controllers/objectController');

// notice 페이지 화면 출력
router.get('/manager/notice', showNotice);

// notice 페이지 데이터 추가
router.post('/manager/notice', writeNotice);

router.get('/', (req, res) => {
  objectDB.getAllObjects((data) => {
    // 컨트롤러에서 받아온 값
    const OBJECT = data;
    const objectCounts = OBJECT.length;

    // 메인 페이지에 값 전달하기
    res.render('main', { OBJECT, objectCounts });
  });
});

module.exports = router;
