'use strict';
const Uuid = require('uuid');	// for userID
const Boom = require('boom');	// for HTTP-friendly error object

exports.register = function (server, options, next) {
	let store;
	
	// Make dependency on hapi-level plugin, which will be used to connect to levelDB
	server.dependency('hapi-level', (server, after) => {
		store = server.plugins['hapi-level'].db;
		return after();
	});
	
	// getUser as a function to retrieve users from levelDB datastore
	// separating this from handler to enable us to expose this function, hence can be 
	// called from anywhere which have server reference through server.plugins.userStore.getUser()
	const getUser = function (userId, callback) {
		return store.get(userId, callback);
	};
	
	const createUser = function (userDetails, callback) {
		const userId = Uuid.v4();
		const user = {
			id: userId,
			details: userDetails
		};
		store.put(userId, user, (err) => {
			callback(err, user);
		});
	};
	
	server.route([
		{
			method: 'GET',
			path: '/user/{userId}',
			config: {
				handler: function (request, reply) {
					const userId = request.params.userId;
					getUser(userId, (err, user) => {
						if(err) {
							return reply(Boom.notFound(err));
						}
						return reply(user);
					});
				},
				description: 'Retrieve a user'
			}
		},
		{
			method: 'POST',
			path: '/user',
			config: {
				handler: function (request, reply) {
					const userDetails = request.payload;
					createUser(userDetails, (err, user) => {
						if(err) {
							return reply(Boom.badRequest(err));
						}
						return reply(user);
					});
				},
				description: 'Create a user'
			}
		}
	]);
	
	server.expose({
		getUser: getUser,
		createUser: createUser
	});
	
	return next();
};

exports.register.attributes = {
	name: 'userStore'
};
