/* Example of dedicating manifest configuration
Then using rejoice to start server.
To start, run : ./node_modules/rejoice/bin/rejoice -c manifest.js -p ./

Use rejoice Vers <3. npm install rejoice@"<3"
*/

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
		},
		{
			'inert': {}
		},
		{
			'./list-file.js': {}
		}
	]
};

module.exports = manifest;