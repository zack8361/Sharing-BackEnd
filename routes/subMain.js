const express = require('express');

const router = express.Router();

router.get('/:OBJECT_TYPE', (req, res) => {
  res.render('subMain');
});

module.exports = router;
