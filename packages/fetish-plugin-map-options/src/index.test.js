
import test from 'ava';

import { fetish } from 'fetish-nude';
import mapOptions from '.';

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
