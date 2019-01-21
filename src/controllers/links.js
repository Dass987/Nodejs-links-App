const linksController = {};
const pool = require('../database');

linksController.index = (request, response) => {
	response.render('links/add');
};

linksController.newLink = (request, response) => {
	response.send('Received');
};

module.exports = linksController;