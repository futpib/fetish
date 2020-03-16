/* global Response */
/* eslint-disable no-restricted-globals */

// eslint-disable-next-line no-unused-vars
const fetch = require('isomorphic-fetch'); // Polyfill global.Response

const test = require('ava');

const { fetish } = require('fetish-nude');
const multicastResponse = require('.');

test('Multiple calls to `.json()` work', async t => {
	const json = {
		test: 'best',
	};

	const response = await fetish.with(multicastResponse)({
		fetch: () => new Response(JSON.stringify(json)),
	});

	t.deepEqual(await response.json(), json);
	t.deepEqual(await response.json(), json);
	t.deepEqual(await response.json(), json);
});
