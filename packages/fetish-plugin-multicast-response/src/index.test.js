/* global Response */
/* eslint-disable no-restricted-globals */

// eslint-disable-next-line no-unused-vars
import fetch from 'isomorphic-fetch'; // Polyfill global.Response

import test from 'ava';

import {fetish} from 'fetish-nude';
import multicastResponse from '.';

test(async t => {
	const json = {
		test: 'best'
	};

	const response = await fetish.with(multicastResponse)({
		fetch: () => new Response(JSON.stringify(json))
	});

	t.deepEqual(await response.json(), json);
	t.deepEqual(await response.json(), json);
	t.deepEqual(await response.json(), json);
});
