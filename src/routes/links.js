const express = require('express');
const router = express.Router();
const links = require('../controllers/links');
const { isLoggedIn } = require('../lib/auth');

// --- Get
router.get('/', isLoggedIn, links.index);
router.get('/add', isLoggedIn, links.formNewLink);

// --- Post
router.post('/add', isLoggedIn, links.newLink);

// --- Delete
router.get('/delete/:id', isLoggedIn, links.deleteLink);

// --- Update
router.get('/edit/:id', isLoggedIn, links.formUpdateLink);
router.post('/edit/:id', isLoggedIn, links.updateLink);

module.exports = router;