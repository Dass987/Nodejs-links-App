const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// --- GET
router.get('/signin', isNotLoggedIn, auth.formSignin);
router.get('/signup', isNotLoggedIn, auth.formSignup);
router.get('/profile', isLoggedIn, auth.profile);
router.get('/logout', isLoggedIn, auth.logout);

// --- POST
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

module.exports = router;