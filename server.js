'use strict';
const Hapi = require('hapi');
const Blipp = require('blipp');
const HapiLevel = require('hapi-level');	// micro library to create LevelDB datastore, which expose LevelDB API through
											// server.plugins['hapi-level'].db and store the reference in variable HapiLevel
const UserStore = require('./user-store.js');
const server = new Hapi.Server();

server.connection({
	port: 1337,
	host: '127.0.0.1'
});

server.register([
	{
		register: HapiLevel,
		options: {
			config: {
				valueEncoding: 'json'		// set value encoding to json instead of using its default utf8 encoding
			}
		}
	},
	UserStore,
	Blipp
], (err) => {
	server.start((err) => {
		console.log(`Server running at ${server.info.uri}`);
	});
});

/* Example server.register's option (registering plugin) to add prefix of /v1 to the routes.
// Benefit for versioning API

server.register(
	{
		register: Hello,
		options: {}
	},
	{
		routes: {
			prefix: '/v1'
		}
	},
	(err) => {
		// Start server
	}
);
*/
