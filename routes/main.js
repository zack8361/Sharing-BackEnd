const express = require('express');
const objectDB = require('../controllers/objectController');

const router = express.Router();
router.get('/main', (req, res) => {
  objectDB.getAllObjects((data) => {
    // 컨트롤러에서 받아온 값
    const OBJECT = data;
    const objectCounts = OBJECT.length;

    // 메인 페이지에 값 전달하기
    res.render('main', { OBJECT, objectCounts });
  });
});

module.exports = router;
