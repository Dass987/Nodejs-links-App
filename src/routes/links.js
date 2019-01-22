const express = require('express');
const router = express.Router();
const links = require('../controllers/links');

// --- Get
router.get('/', links.index);
router.get('/add', links.formNewLink);

// --- Post
router.post('/add', links.newLink);

// --- Delete
router.get('/delete/:id', links.deleteLink);

module.exports = router;