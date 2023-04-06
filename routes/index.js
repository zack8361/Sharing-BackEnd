// express 설정.
const express = require('express');
// router 설정.
const router = express.Router();

// localhost:4000/ 의주소부터 시작.
router.get('/', (req, res) => {
  res.render('index', { msg: '이 데이터는 백엔드가 보냈어요' });
});

module.exports = router;
