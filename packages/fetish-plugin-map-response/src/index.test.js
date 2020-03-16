
const test = require('ava');

const { fetish } = require('fetish-nude');
const mapResponse = require('.');

test('response is transformed', async t => {
	const response = {
		status: 500,
	};
	const fetch = () => response;

	const actualResponse = await fetish
		.with(mapResponse(response => ({
			status: 200,
			originalResponse: response,
		})))({ fetch });

	t.deepEqual(actualResponse, {
		status: 200,
		originalResponse: {
			status: 500,
		},
	});
});
