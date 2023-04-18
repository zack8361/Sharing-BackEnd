// express 설정.
const express = require('express');
const { showName } = require('../controllers/chatBotController');
const router = express.Router();

router.get('/:id', showName);

module.exports = router;
