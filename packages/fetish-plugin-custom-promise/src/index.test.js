/* eslint-disable no-restricted-globals */

import test from 'ava';
import { spy } from 'sinon';

import { fetish } from 'fetish-nude';
import customPromise from '.';

class MyPromise extends Promise {}

test('uses custom `Promise` constructor', async t => {
	const spyFetish = spy(fetish);

	const response = {};

	const promise = spyFetish.with(customPromise(MyPromise))({
		url: 'test',
		method: 'GET',
		fetch: (url, options) => {
			t.is(url, 'test');
			t.deepEqual(options, { method: 'GET' });
			return response;
		},
	});

	t.true(promise instanceof MyPromise);

	t.is(await promise, response);

	t.true(spyFetish.calledOnce);

	const { args: [ options ], returnValue } = spyFetish.lastCall;

	t.true(options.Promise === MyPromise);
	t.true(returnValue instanceof MyPromise);
});
