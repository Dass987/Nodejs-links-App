const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

module.exports = app => {

	// --- Settings
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, '../views'));
	app.engine('.hbs', exphbs({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs',
		helpers: require('../lib/handlebars')
	}));
	app.set('view engine', '.hbs');
	
	// --- Middlewares
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(morgan('dev'));

	// --- Routes
	app.use(require('../routes/index'));
	app.use(require('../routes/auth'));
	app.use('/links', require('../routes/links'));


	// --- Static files
	app.use('/public', express.static(path.join(__dirname, '../public')))
	
	// --- Global variables
	app.use((request, response, next) => {

		
		
		next();
	});

	// --- Error handlers
	if ('development' === app.get('env')) {
		//app.use(errorHandler);
	}

	return app;

};