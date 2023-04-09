// express 설정.
const express = require('express');
const { registerUser, loginUser } = require('../controllers/loginController');

// router 설정.
const router = express.Router();

// 회원가입 창 띄우기
router.get('/register', (req, res) => {
  res.render('register');
});

// 회원가입 등록하기.
router.post('/register', registerUser);

// 로그인 창 보여주기
router.get('/login', (req, res) => {
  res.render('login');
});

// 로그인 등록하기.
router.post('/login', loginUser);
module.exports = router;
