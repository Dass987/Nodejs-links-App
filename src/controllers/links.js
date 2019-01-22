const linksController = {};
const pool = require('../database');

linksController.index = async (request, response) => {
	
	const links = await pool.query('SELECT * FROM links LIMIT 10');
	console.log(links);
	response.render('links/links', {links});

};

linksController.formNewLink = (request, response) => {
	response.render('links/add');
};

linksController.newLink = async (request, response) => {
	
	const { title, url, description } = request.body;

	const newLink = {
		title,
		url,
		description
	};

	await pool.query('INSERT INTO links SET ?', [newLink]);

	response.send('Received');

};

module.exports = linksController;