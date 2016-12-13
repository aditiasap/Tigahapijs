/*
Next :
- use Confidence to modularize configuration
- For test, use Nock to mock HTTP request
- For test, use Sinon to mock and stub 
*/

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
	// exporting server for test purpose 
	module.exports = server;
});
