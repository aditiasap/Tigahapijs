const Path = require('path');
const Inert = require('inert');

exports.register = function (server, options, next) {

	//server.register(Inert, (err) => {
		// serve static html and image files
	server.route({
		method: 'GET',
		path: '/files/{files*}',
		handler: {
			// handle reply file starting from directory path onward
			directory: {
				path: __dirname + '/list'
			}
		}
	});

	return next();
};

exports.register.attributes = {
	name: 'listFile'
};