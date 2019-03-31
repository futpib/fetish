
import test from 'ava';

import { fetish } from 'fetish-nude';
import serializePathnameArray from '.';

test('with url', async t => {
	await fetish.with(serializePathnameArray)({
		url: '/api?p=a',
		pathname: [
			'users',
			'foo://bar/buz?k=v',
			'profile',
		],
		fetch: (url, options) => {
			t.is(url, '/api/users/foo%3A%2F%2Fbar%2Fbuz%3Fk%3Dv/profile?p=a');
			t.is(options.pathname, undefined);
		},
	});
});

test('without url', async t => {
	await fetish.with(serializePathnameArray)({
		pathname: [
			'users',
			'foo://bar/buz?k=v',
			'profile',
		],
		fetch: (url, options) => {
			t.is(url, '/users/foo%3A%2F%2Fbar%2Fbuz%3Fk%3Dv/profile');
			t.is(options.pathname, undefined);
		},
	});
});

test('with url, without pathname (noop)', async t => {
	await fetish.with(serializePathnameArray)({
		url: '/api?p=a',
		fetch: (url, options) => {
			t.is(url, '/api?p=a');
			t.is(options.pathname, undefined);
		},
	});
});

test('with url, with empty pathname (noop)', async t => {
	await fetish.with(serializePathnameArray)({
		url: '/api?p=a',
		pathname: [],
		fetch: (url, options) => {
			t.is(url, '/api?p=a');
			t.is(options.pathname, undefined);
		},
	});
});
