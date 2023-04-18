const express = require('express');
const {
  showSubMain,
  findRentObj,
  showSideBar,
  appendObject,
  deleteObject,
} = require('../controllers/subMainController');

const router = express.Router();

router.get('/:id', showSubMain);

// 관리자 물품 페이지 데이터 추가
router.post('/manager/producttable/append/:type', appendObject);
// 관리자 물품 페이지 데이터 삭제
router.post('/manager/producttable/delete/:code', deleteObject);

router.get('/sideBar/show', showSideBar);

router.get('/find/:id/:code/:type', findRentObj);
module.exports = router;
