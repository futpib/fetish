
const test = require('ava');

const { fetish } = require('fetish-nude');
const serializeQuery = require('.');

test('query gets serialized', async t => {
	await fetish.with(serializeQuery)({
		url: '/test?a=a1&b=b1',
		query: {
			b: 'b2',
			c: 'c2',
		},
		fetch: (url, options) => {
			t.is(url, '/test?a=a1&b=b2&c=c2');
			t.is(options.query, undefined);
		},
	});
});
