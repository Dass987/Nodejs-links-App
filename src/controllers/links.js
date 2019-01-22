const linksController = {};
const pool = require('../database');

linksController.index = async (request, response) => {
	
	const links = await pool.query('SELECT * FROM links LIMIT 10');
	//console.log(links);
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

	response.redirect('/links');

};

linksController.deleteLink = async (request, response) => {

	const { id } = request.params;
	await pool.query('DELETE FROM links WHERE id = ?', [id]);
	
	response.redirect('/links');
	
};

linksController.formUpdateLink = async (request, response) => {

	const { id } = request.params;
	const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
	
	response.render('links/edit', { link: link[0] });

};

linksController.updateLink = async (request, response) => {

	const { id } = request.params;
	const { title, url, description } = request.body;
	const newLink = {
		title,
		description,
		url
	};

	await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
	
	response.redirect('/links');

};

module.exports = linksController;