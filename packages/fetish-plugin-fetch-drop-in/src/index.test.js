
const test = require('ava');

const { fetish } = require('fetish-nude');
const fetishDropIn = require('.');

test('`.fetch` works as expected', async t => {
	const args = [ 'test', { method: 'TEST' } ];
	const fetch = (...actualArgs) => t.deepEqual(actualArgs, args);

	const fetchMiddleware = old => options => old(Object.assign({ fetch }, options));

	await fetish.with(fetishDropIn).with(fetchMiddleware).fetch(...args);
});
