const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { database } = require('../keys');

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

	app.use(session({
		secret: 'mysecretapp',
		resave: false,
		saveUninitialized: false,
		store: new MySQLStore(database)
	}));
	app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session());
	

	// --- Routes
	app.use(require('../routes/index'));
	app.use(require('../routes/auth'));
	app.use('/links', require('../routes/links'));

	// --- Global variables
	app.use((request, response, next) => {

		app.locals.success = request.flash('success');
		app.locals.message = request.flash('message');

		next();
	});

	// --- Static files
	app.use('/public', express.static(path.join(__dirname, '../public')))
	
	// --- Error handlers
	if ('development' === app.get('env')) {
		//app.use(errorHandler);
	}

	return app;

};