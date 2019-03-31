
import test from 'ava';

import { fetish } from 'fetish-nude';
import customFetch from '.';

test('calls custom `fetch` function', async t => {
	await fetish.with(customFetch((url, options) => {
		t.is(url, 'test');
		t.deepEqual(options, { method: 'GET' });
	}))({
		url: 'test',
		method: 'GET',
	});
});
