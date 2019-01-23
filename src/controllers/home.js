const homeController = {};

homeController.index = async (request, response) => {
	response.render('index');
};

module.exports = homeController;