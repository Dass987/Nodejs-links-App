const express = require('express');
const path = require('path');
const morgan = require('morgan');

module.exports = app => {

	// --- Settings
	app.set('port', process.env.PORT || 3000);

	// --- Middlewares
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(morgan('dev'));

	// --- Routes
	

	// --- Static files
	

	// --- Error handlers
	if ('development' === app.get('env')) {
		//app.use(errorHandler);
	}

	return app;

};