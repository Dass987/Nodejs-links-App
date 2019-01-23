const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

// --- GET
router.get('/signin', auth.formSignin);
router.get('/signup', auth.formSignup);
router.get('/profile', auth.profile);
router.get('/logout', auth.logout);

// --- POST
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

module.exports = router;