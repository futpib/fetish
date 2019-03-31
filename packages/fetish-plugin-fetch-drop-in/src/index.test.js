
import test from 'ava';

import { fetish } from 'fetish-nude';
import fetishDropIn from '.';

test('`.fetch` works as expected', async t => {
	const args = [ 'test', { method: 'TEST' } ];
	const fetch = (...actualArgs) => t.deepEqual(actualArgs, args);

	const fetchMiddleware = old => options => old(Object.assign({ fetch }, options));

	await fetish.with(fetishDropIn).with(fetchMiddleware).fetch(...args);
});
