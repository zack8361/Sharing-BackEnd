const express = require('express');

const { showLog, showLog2 } = require('../controllers/logController');

// router 설정.
const router = express.Router();

router.get('/showLog', showLog);

router.get('/showLog/:type', showLog2);

module.exports = router;
