const express = require('express');
const { showSubMain } = require('../controllers/subMainController');

const router = express.Router();

router.get('/:id', showSubMain);

module.exports = router;
