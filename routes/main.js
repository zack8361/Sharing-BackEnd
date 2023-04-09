const express = require('express');
const { showMain, showMypage } = require('../controllers/mainController');

const router = express.Router();

const isLogin = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.send(
      "<script>alert('로그인 해주세요'); window.location.replace('/login');</script>",
    );
  }
};

// user_main 화면 출력
router.get('/', isLogin, showMain);

// user_mypage 화면 출력
router.get('/mypage/:id', isLogin, showMypage);

module.exports = router;
