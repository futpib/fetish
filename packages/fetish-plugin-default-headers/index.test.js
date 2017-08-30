
import test from 'ava';

import {fetish} from 'fetish-nude';
import defaultHeaders from '.';

test(async t => {
	await fetish.with(defaultHeaders({
		a: 'a1',
		b: 'b1'
	}))({
		headers: {
			b: 'b2',
			c: 'c2'
		},
		fetch: (url, options) => {
			t.deepEqual(options, {
				headers: {
					a: 'a1',
					b: 'b2',
					c: 'c2'
				}
			});
		}
	});
});
