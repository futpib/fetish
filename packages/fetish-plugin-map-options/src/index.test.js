
const test = require('ava');

const { fetish } = require('fetish-nude');
const mapOptions = require('.');

test('options are transformed', async t => {
	await fetish.with(mapOptions(({ foo, ...options }) => ({
		foo: foo + 1,
		...options,
	})))({
		foo: 0,
		fetch: (url, options) => {
			t.deepEqual(options, {
				foo: 1,
			});
		},
	});
});
