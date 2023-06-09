// express 설정.
const express = require('express');
const {
  registerUser,
  loginUser,
  kakaoLoginUser,
  verifyToken,
} = require('../controllers/loginController');

// router 설정.
const router = express.Router();

// 회원가입 창 띄우기
router.get('/register', (req, res) => {
  res.status(200).json('회원가입창 띄워');
});

// 회원가입 등록하기.
router.post('/register', registerUser);

// 로그인 창 보여주기
router.get('/login', (req, res) => {
  res.status(200).json('로그인 완료');
});

// 카카오톡 회원가입
router.post('/kakaoRegister', kakaoLoginUser);

// 로그인 등록하기.
router.post('/login', loginUser);
router.post('/token', verifyToken);
module.exports = router;
