const express = require('express');
const router = express.Router();
const links = require('../controllers/links');

router.get('/add', links.index);
router.post('/add', links.newLink);

module.exports = router;