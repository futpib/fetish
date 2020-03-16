/* eslint-disable no-restricted-globals */

const test = require('ava');
const { spy } = require('sinon');

const { fetish } = require('.');

const methods = [
	'connect',
	'delete',
	'get',
	'head',
	'options',
	'post',
	'put',
];

const requestMacro = async (t, method) => {
	const response = {};
	const fetch = spy(async () => response);

	const actualResponse = await fetish({
		url: 'test',
		method,
		fetch,
	});

	t.true(fetch.calledOnce);
	t.is(actualResponse, response);

	const [ url, options ] = fetch.lastCall.args;

	t.is(url, 'test');
	t.is(options.method, method);
	t.deepEqual(Object.keys(options), [ 'method' ]);
};

methods.forEach(method => {
	test(`’${method}’ some`, requestMacro, method);
});

test('async middleware', async t => {
	t.plan(7);

	const response = {};
	const fetch = spy(async () => response);

	const options = {
		url: 'test',
		fetch,
	};

	const plugin = next => {
		t.is(typeof next, 'function');

		return async options_ => {
			t.deepEqual(options_, options);

			const actualResponse = await next(options_);

			t.is(actualResponse, response);

			return actualResponse;
		};
	};

	const actualResponse = await fetish.with(plugin)(options);

	t.true(fetch.calledOnce);
	t.is(actualResponse, response);

	const [ url, actualOptions ] = fetch.lastCall.args;

	t.is(url, 'test');
	t.deepEqual(actualOptions, {});
});

test('middleware composition', async t => {
	const syncIdentityMiddleware = f => o => f(o).then(x => x);
	const asyncIdentityMiddleware = f => async o => f(o).then(async x => x);

	await fetish
		.with(syncIdentityMiddleware)
		.with(asyncIdentityMiddleware)
		.with(syncIdentityMiddleware)
		.with(asyncIdentityMiddleware)
		.with(syncIdentityMiddleware)
		.with(syncIdentityMiddleware)
		.with(asyncIdentityMiddleware)
		.with(asyncIdentityMiddleware)({
			url: 'test',
			fetch: async (url, options) => {
				t.is(url, 'test');
				t.deepEqual(options, {});
			},
		});
});

test('a readable error is thrown if middleware returns non-promise', async t => {
	const response = null;
	const syncNullMiddleware = () => () => response;

	const err = await t.throws(() => fetish.with(syncNullMiddleware)('test'));

	t.true(err instanceof Error);
	t.regex(err.message, /promise/i);
});

test('`Promise` option', async t => {
	class MyPromise extends Promise {}
	const response = {};

	const result = fetish({
		url: '/test/',
		Promise: MyPromise,
		fetch: () => Promise.resolve(response),
	});

	t.true(result instanceof MyPromise);
	t.is(await result, response);
});

test('middleware composition can not be broken by a synchronous `fetch`', async t => {
	const syncIdentityMiddleware = f => o => f(o).then(x => x);
	const asyncIdentityMiddleware = f => async o => f(o).then(async x => x);

	await fetish
		.with(syncIdentityMiddleware)
		.with(asyncIdentityMiddleware)({
			fetch: () => null,
		});

	t.pass();
});

test('expando plugin', t => {
	const newFetish = fetish.with(old => Object.assign(x => old(x), { a: 1 }));
	t.is(newFetish.a, 1);
	t.is(fetish.a, undefined);
});

test('expando plugin cannot polute root fetish', t => {
	const newFetish = fetish.with(old => Object.assign(old, { a: 1 }));
	t.is(newFetish.a, 1);
	t.is(fetish.a, undefined);
});
