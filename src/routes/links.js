const express = require('express');
const router = express.Router();
const links = require('../controllers/links');

router.get('/', links.index);

module.exports = router;