const express = require('express');
const {
  showConfirm,
  showAccept,
  showAcceptReturn,
} = require('../controllers/managerController');
const router = express.Router();

// localhost:4000/manager/confirm/${type}
router.get('/confirm/:type', showConfirm);
router.post('/accept/:code', showAccept);
router.post('/acceptReturn/:code', showAcceptReturn);
module.exports = router;
