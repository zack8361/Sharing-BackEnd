const express = require('express');
const {
  showSubMain,
  findRentObj,
} = require('../controllers/subMainController');

const router = express.Router();

router.get('/:id', showSubMain);

router.get('/find/:id/:type', findRentObj);
module.exports = router;
