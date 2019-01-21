const express = require('express');
const config = require('./server/config');

// --- Inits
const app = config(express());

// --- Global variables

// --- Server listening
app.listen(app.get('port'), () => {
	console.log('Server on port ' + app.get('port'));
});