// express 설정.
const express = require('express');
const { registerUser } = require('../controllers/loginController');

// router 설정.
const router = express.Router();

// login 화면 띄우기

router.get('/register', (req, res) => {
  res.render('login');
});
router.post('/register', registerUser);

module.exports = router;
