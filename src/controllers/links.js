const linksController = {};
const pool = require('../database');

linksController.index = (request, response) => {
	response.render('links/add');
};

module.exports = linksController;