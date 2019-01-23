const authenticationController = {};
const passport = require('../lib/passport');

authenticationController.profile = (request, response) => {
	response.render('profile');
};

authenticationController.logout = (request, response) => {
	request.logOut();
	response.redirect('/signin');
};

authenticationController.formSignup = (request, response) => {
	response.render('auth/signup');
};

authenticationController.formSignin = (request, response) => {
	response.render('auth/signin');
};

authenticationController.signup = passport.authenticate('local.signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
});

authenticationController.signin = (request, response, next) => {
	
	passport.authenticate('local.signin', {
		successRedirect: '/profile',
		failureRedirect: '/signin',
		failureFlash: true
	})(request, response, next);

};

module.exports = authenticationController;