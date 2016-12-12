const Code = require('code');
const Lab = require('lab');

const server = require('./lib/index.js');

const lab = exports.lab = Lab.script();

/* lab.experiment to group some tests.
lab.experiment('Test Part 1', () => {
*/
	lab.test('It will return Hello World', (done) => {
		// inject API is provided by shot module
		server.inject('/', (res) => {
			Code.expect(res.statusCode).to.equal(200);
			Code.expect(res.result).to.equal('Hello World\n');
			done();
		});
	});
/*
});
*/