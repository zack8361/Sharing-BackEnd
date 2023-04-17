const express = require('express');
const { showLog } = require('../controllers/logController');
// router 설정.
const router = express.Router();

router.get('/showLog', showLog);
module.exports = router;
