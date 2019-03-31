/* global Response */
/* eslint-disable no-restricted-globals */

// eslint-disable-next-line no-unused-vars
import fetch from 'isomorphic-fetch'; // Polyfill global.Response

import Immutable from 'immutable';

import test from 'ava';

import { fetish } from 'fetish-nude';
import immutableResponse from '.';

test('`response.immutable` method works', async t => {
	const json = {
		test: 'best',
	};

	const response = await fetish.with(immutableResponse)({
		fetch: () => new Response(JSON.stringify(json)),
	});

	t.true(Immutable.is(await response.immutable(), Immutable.fromJS(json)));
});
