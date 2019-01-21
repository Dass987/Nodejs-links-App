const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.get('/', auth.index);

module.exports = router;