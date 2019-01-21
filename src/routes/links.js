const express = require('express');
const router = express.Router();
const links = require('../controllers/links');

router.get('/add', links.index);

module.exports = router;