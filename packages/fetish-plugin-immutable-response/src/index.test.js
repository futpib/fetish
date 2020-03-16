/* global Response */
/* eslint-disable no-restricted-globals */

// eslint-disable-next-line no-unused-vars
const fetch = require('isomorphic-fetch'); // Polyfill global.Response

const Immutable = require('immutable');

const test = require('ava');

const { fetish } = require('fetish-nude');
const immutableResponse = require('.');

test('`response.immutable` method works', async t => {
	const json = {
		test: 'best',
	};

	const response = await fetish.with(immutableResponse)({
		fetch: () => new Response(JSON.stringify(json)),
	});

	t.true(Immutable.is(await response.immutable(), Immutable.fromJS(json)));
});
