// express 설정.
const express = require('express');
// loginController 의 LoginDB가져오기
const loginDB = require('../controllers/loginController');
// router 설정.
const router = express.Router();

// login 화면 띄우기
router.get('/', (req, res) => {
  loginDB.IMG((data) => {
    // const src = Buffer.from(data[0].IMG, 'utf-8').toString('base64');
    const dataArr = data[0].IMG;
    const src = Buffer.from(dataArr, 'utf-8').toString('base64');
    console.log(src);
    res.render('login', { src });
  });
});

router.post('/', (req, res) => {
  loginDB.login((data) => {
    // console.log(req.body);
    console.log(data);
    if (data.length >= 1) {
      res.render('main');
    }
    res.send(
      "<script>alert('가입되지 않은 정보입니다!'); window.location.replace('/login');</script>",
    );
  });
});

module.exports = router;
