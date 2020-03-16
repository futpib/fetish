/* eslint-disable no-restricted-globals */

const test = require('ava');
const { spy } = require('sinon');

const { fetish } = require('fetish-nude');
const customPromise = require('.');

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
