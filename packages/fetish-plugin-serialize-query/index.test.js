
import test from 'ava';

import {fetish} from 'fetish-nude';
import serializeQuery from '.';

test(async t => {
	await fetish.with(serializeQuery)({
		url: '/test?a=a1&b=b1',
		query: {
			b: 'b2',
			c: 'c2'
		},
		fetch: (url, options) => {
			t.is(url, '/test?a=a1&b=b2&c=c2');
			t.is(options.query, undefined);
		}
	});
});
