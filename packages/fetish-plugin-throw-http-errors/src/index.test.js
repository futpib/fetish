
import test from 'ava';

import {fetish} from 'fetish-nude';
import httpErrors from '.';

test('404 throws an error', async t => {
	const response = {
		status: 404,
		statusText: 'Not Found'
	};
	const fetch = () => response;

	const err = await t.throws(fetish.with(httpErrors)({fetch}));

	t.is(err.message, response.statusText);
	t.is(err.response, response);
});

test('202 does not throw an error', async t => {
	const response = {
		status: 202,
		statusText: 'Accepted'
	};
	const fetch = () => response;

	const actualResponse = await fetish.with(httpErrors)({fetch});

	t.is(actualResponse, response);
});
