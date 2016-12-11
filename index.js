/* Example of using Glue to start server.
To start, run : node index.js

Use Glue vers 2.4.0
*/

const Glue = require('glue');
const manifest = require('./manifest');
/*
const manifest = {
	server: {},
	connections: [
		{
			port: 1337,
			host: '127.0.0.1'
		}
	],
	plugins: [
		{
			'hapi-level': {
				path: './temp',
				config: {
					valueEncoding: 'json'
				}
			}
		},
		{
			'./user-store.js': {}
		},
		{
			'blipp': {}
		}
	]
};
*/

Glue.compose(manifest, {relativeTo: __dirname}, (err, server) => {
	server.start((err) => {
//		console.log(`Server running at ${server.info.uri}`);
	});
});