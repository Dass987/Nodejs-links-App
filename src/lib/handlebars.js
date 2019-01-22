const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = timestamp => {
	return format(timestamp);
};

helpers.indexPlus = index => {
	return index + 1;
};

module.exports = helpers;