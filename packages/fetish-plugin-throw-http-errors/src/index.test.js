
const test = require('ava');

const { fetish } = require('fetish-nude');
const httpErrors = require('.');

test('404 throws an error', async t => {
	const response = {
		status: 404,
		statusText: 'Not Found',
	};
	const fetch = () => response;

	const error = await t.throwsAsync(fetish.with(httpErrors)({ fetch }));

	t.is(error.message, response.statusText);
	t.is(error.response, response);
});

test('202 does not throw an error', async t => {
	const response = {
		status: 202,
		statusText: 'Accepted',
	};
	const fetch = () => response;

	const actualResponse = await fetish.with(httpErrors)({ fetch });

	t.is(actualResponse, response);
});
