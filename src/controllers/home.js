const homeController = {};

homeController.index = async (request, response) => {
	response.send('This is the index');
};

module.exports = homeController;