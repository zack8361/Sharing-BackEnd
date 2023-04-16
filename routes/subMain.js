const express = require('express');
const {
  showSubMain,
  findRentObj,
  showSideBar,
} = require('../controllers/subMainController');

const router = express.Router();

router.get('/:id', showSubMain);

router.get('/sideBar/show', showSideBar);

router.get('/find/:id/:code/:type', findRentObj);
module.exports = router;
