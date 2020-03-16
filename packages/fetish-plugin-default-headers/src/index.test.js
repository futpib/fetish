
const test = require('ava');

const { fetish } = require('fetish-nude');
const defaultHeaders = require('.');

test('default headers are set', async t => {
	await fetish.with(defaultHeaders({
		a: 'a1',
		b: 'b1',
	}))({
		headers: {
			b: 'b2',
			c: 'c2',
		},
		fetch: (url, options) => {
			t.deepEqual(options, {
				headers: {
					a: 'a1',
					b: 'b2',
					c: 'c2',
				},
			});
		},
	});
});
