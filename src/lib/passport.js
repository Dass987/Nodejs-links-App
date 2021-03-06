const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (request, username, password, done) => {
	console.log('AQUI PASO');
	const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
	
	if (rows.length > 0) {
		
		const user = rows[0];
		const validPasswword = await helpers.matchPassword(password, user.password);

		if (validPasswword) {
			return done(null, user, request.flash('success', 'Welcome ' + user.username));
		} else {
			return done(null, false, request.flash('message', 'Incorrect password!'));
		}

	} else {
		return done(null, false, request.flash('message', 'User does not exist'));
	}

}));



passport.use('local.signup', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (request, username, password, done) => {

	const { fullname } = request.body;

	const newUser = {
		username,
		password,
		fullname
	};

	newUser.password = await helpers.encryptPassword(newUser.password);

	const result = await pool.query('INSERT INTO users SET ?', [newUser]);
	newUser.id = result.insertId;
	return done(null, newUser);

}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

	done(null, rows[0]);

});

module.exports = passport;