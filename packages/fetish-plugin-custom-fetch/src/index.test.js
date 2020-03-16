
const test = require('ava');

const { fetish } = require('fetish-nude');
const customFetch = require('.');

test('calls custom `fetch` function', async t => {
	await fetish.with(customFetch((url, options) => {
		t.is(url, 'test');
		t.deepEqual(options, { method: 'GET' });
	}))({
		url: 'test',
		method: 'GET',
	});
});
